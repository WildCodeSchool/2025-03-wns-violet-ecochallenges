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
import { IsDate, IsNotEmpty, MinLength, validate } from "class-validator";
import { plainToClass, Type } from "class-transformer";
import { Challenge } from "../entities/Challenge";
import { Context } from "../types/Context";
import { Ecogesture } from "../entities/Ecogesture";
import { User } from "../entities/User";
import { UserChallenge } from "../entities/UserChallenge";
import dataSource from "../config/db";

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
  picture: string;

  @Field(() => [Number], { nullable: true })
  ecogestureIds?: number[];

  @Field(() => [Number], { nullable: true })
  participantIds?: number[];
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
      picture: data.picture,
      description: data.description,
      createdBy: user,
      ecogestures: ecogestures,
    });

    await challenge.save();

    const userChallengeRepo = dataSource.getRepository(UserChallenge);

    // Associer le créateur au challenge (accepté par defaut)
    await userChallengeRepo.insert({
      user: { id: user.id },
      challenge: { id: challenge.id },
      hasAccepted: true,
    });

    // Associer les participants invités (en attente d'acceptation)
    // On exclut le créateur : il est déjà associé avec hasAccepted: true
    const invitedIds = (data.participantIds ?? []).filter(
      (id) => id !== user.id,
    );
    if (invitedIds.length > 0) {
      const participants = await User.findBy({ id: In(invitedIds) });
      await Promise.all(
        participants.map((participant: User) =>
          userChallengeRepo.insert({
            user: { id: participant.id },
            challenge: { id: challenge.id },
            hasAccepted: true,
          }),
        ),
      );
    }

    return challenge;
  }

  @Query(() => Challenge)
  async getChallengeById(@Arg("id") id: number): Promise<Challenge> {
    const challenge = await Challenge.findOne({
      where: { id },
      relations: ["ecogestures", "participants", "createdBy"],
    });

    if (!challenge) {
      throw new Error("Challenge non trouvé");
    }
    return challenge;
  }
}
