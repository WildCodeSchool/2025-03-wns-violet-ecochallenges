import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { IsDate, IsNotEmpty, MinLength, validate } from "class-validator";
import { plainToClass, Type } from "class-transformer";
import { Challenge } from "../entities/Challenge";
import { Context } from "../types/Context";
import { User } from "../entities/User";

@InputType()
export class NewChallengeInput {
  @Field()
  @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
  @MinLength(3, { message: "Le titre doit faire au moins 3 caractères" })
  label: string;

  @Field()
  // Converts GraphQL ISO string → JavaScript Date → PostgreSQL TIMESTAMP
  @Type(() => Date)
  @IsDate({ message: "La date de début doit être une date valide" })
  startingDate: Date;

  @Field()
  @Type(() => Date)
  @IsDate({ message: "La date de fin doit être une date valide" })
  endingDate: Date;

  @Field()
  picture: string;
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

  @Field({ nullable: true })
  filter?: ChallengeFilter;
}

export enum ChallengeFilter {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  TERMINATED = "TERMINATED",
}

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
    input?: GetMyChallengesInput
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

    if (filter === ChallengeFilter.CREATED) {
      queryBuilder.where("challenge.createdById = :userId", {
        userId: ctx.user.id,
      });
    } else if (
      filter === ChallengeFilter.IN_PROGRESS ||
      filter === ChallengeFilter.TERMINATED
    ) {
      queryBuilder.where("challenge.status = :status", {
        status: filter,
      });
    }

    const [challenges, totalCount] = await queryBuilder.getManyAndCount();

    return { totalCount, challenges };
  }

  @Authorized()
  @Mutation(() => Challenge)
  async createChallenge(
    @Arg("data") data: NewChallengeInput,
    @Ctx() ctx: Context
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

    const challenge = Challenge.create({
      label: data.label,
      startingDate: data.startingDate,
      endingDate: data.endingDate,
      picture: data.picture,
      createdBy: user,
      //TODO add participants
    });

    await challenge.save();
    return Challenge.findOne({
      where: { id: challenge.id },
      relations: ["createdBy", "participants"],
    });
  }

  @Mutation(() => Challenge)
  async deleteChallenge(@Arg("id") id: number) {
    const challenge = await Challenge.findOneByOrFail({ id });
    //TODO handle db errors
    await Challenge.delete(id);
    return challenge;
  }
}
