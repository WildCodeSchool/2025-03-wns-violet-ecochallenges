import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql";
import { In } from "typeorm";
import {
  IsDate,
  IsNotEmpty,
  Matches,
  MinLength,
  validate,
} from "class-validator";
import { plainToClass, Type } from "class-transformer";
import { Challenge } from "../entities/Challenge";
import { Context } from "../types/Context";
import { Ecogesture } from "../entities/Ecogesture";
import { User } from "../entities/User";
import { tryDeleteCloudinaryImage } from "../lib/cloudinary";

@InputType()
export class NewChallengeInput {
  @Field()
  @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
  @MinLength(3, { message: "Le titre doit faire au moins 3 caractères" })
  label: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  @Type(() => Date)
  @IsDate({ message: "La date de début doit être une date valide" })
  startingDate: Date;

  @Field()
  @Type(() => Date)
  @IsDate({ message: "La date de fin doit être une date valide" })
  endingDate: Date;

  @Field()
  pictureUrl: string;

  @Field(() => [Number], { nullable: true })
  ecogestureIds?: number[];
}

@ObjectType()
class ChallengeListResponse {
  @Field(() => Number)
  totalCount: number;

  @Field(() => [Challenge])
  challenges: Challenge[];
}

@InputType()
class GetMyChallengesInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => ChallengeFilter, { nullable: true })
  filter?: ChallengeFilter;
}

@InputType()
class UpdateChallengePictureInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: "L'URL de l'image ne peut pas être vide" })
  @Matches(/^https?:\/\/.+/, {
    message: "L'URL de l'image doit commencer par http:// ou https://",
  })
  pictureUrl: string;
}

// Filter for getMyChallenges (user point of view)
export enum ChallengeFilter {
  CREATED_BY_ME = "CREATED_BY_ME",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

registerEnumType(ChallengeFilter, {
  name: "ChallengeFilter",
  description: "Filter used on Challenge",
});

@Resolver(Challenge)
export default class ChallengeResolver {
  @Query(() => [Challenge])
  async getAllChallenges() {
    const challenges = await Challenge.find();
    return challenges;
  }

  @Authorized()
  @Query(() => ChallengeListResponse)
  async getMyChallenges(
    @Ctx() ctx: Context,
    @Arg("input", () => GetMyChallengesInput, { nullable: true })
    input?: GetMyChallengesInput,
  ): Promise<ChallengeListResponse> {
    if (!ctx.user) {
      throw new Error("Utilisateur non authentifié");
    }

    const page = input?.page ?? 1;
    const limit = input?.limit ?? 10;
    const skip = (page - 1) * limit;
    const filter = input?.filter;

    const queryBuilder = Challenge.createQueryBuilder("challenge")
      .leftJoinAndSelect("challenge.createdBy", "createdBy")
      .leftJoinAndSelect("challenge.participants", "participants")
      .skip(skip)
      .take(limit);

    const now = new Date();

    if (filter === ChallengeFilter.CREATED_BY_ME) {
      queryBuilder.where("challenge.createdById = :userId", {
        userId: ctx.user.id,
      });
    } else if (filter === ChallengeFilter.IN_PROGRESS) {
      queryBuilder
        .where("challenge.startingDate <= :now", { now })
        .andWhere("challenge.endingDate >= :now", { now });
    } else if (filter === ChallengeFilter.FINISHED) {
      queryBuilder.where("challenge.endingDate < :now", { now });
    }
    const [challenges, totalCount] = await queryBuilder.getManyAndCount();

    return { totalCount, challenges };
  }

  @Authorized()
  @Mutation(() => Challenge)
  async createChallenge(
    @Arg("data") data: NewChallengeInput,
    @Ctx() ctx: Context,
  ) {
    if (!ctx.user) {
      throw new Error("Utilisateur non authentifié");
    }

    const input = plainToClass(NewChallengeInput, data);

    const errors = await validate(input);
    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      throw new Error(messages.join(", "));
    }

    const user = await User.findOneByOrFail({ id: ctx.user.id });

    // Récupère les écogestes si des IDs sont fournis
    let ecogestures: Ecogesture[] = [];
    if (data.ecogestureIds && data.ecogestureIds.length > 0) {
      ecogestures = await Ecogesture.findBy({ id: In(data.ecogestureIds) });

      const uniqueEcogestureIds = Array.from(new Set(data.ecogestureIds));
      ecogestures = await Ecogesture.findByIds(uniqueEcogestureIds);
      // Vérifie que tous les IDs existent
      if (ecogestures.length !== uniqueEcogestureIds.length) {
        throw new Error("Un ou plusieurs écogestes n'existent pas");
      }
    }

    const challenge = Challenge.create({
      label: data.label,
      startingDate: data.startingDate,
      endingDate: data.endingDate,
      pictureUrl: data.pictureUrl,
      description: data.description,
      createdBy: user,
      ecogestures: ecogestures,
      //TODO add participants
    });

    await challenge.save();

    return challenge;
  }

  @Authorized()
  @Mutation(() => Challenge)
  async updateChallengePicture(
    @Arg("data") data: UpdateChallengePictureInput,
    @Ctx() ctx: Context,
  ) {
    if (!ctx.user) {
      throw new Error("Utilisateur non authentifié");
    }

    const challenge = await Challenge.findOne({
      where: { id: data.id },
      relations: ["createdBy"],
    });

    if (!challenge) {
      throw new Error("Challenge non trouvé");
    }

    // Only the creator of the challenge can update its picture
    if (challenge.createdBy.id !== ctx.user.id) {
      throw new Error("Vous n'êtes pas autorisé à modifier ce challenge");
    }

    const oldPictureUrl = challenge.pictureUrl;

    // If the old picture is stocked on Cloudinary, delete it from Cloudinary
    await tryDeleteCloudinaryImage(oldPictureUrl);

    challenge.pictureUrl = data.pictureUrl;
    await challenge.save();

    return challenge;
  }
}
