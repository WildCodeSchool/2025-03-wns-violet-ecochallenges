import {
  Resolver,
  Ctx,
  Query,
  Authorized,
  Mutation,
  Arg,
  Int,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import { UserEcogesture } from "../entities/UserEcogesture";
import { User } from "../entities/User";
import { Ecogesture } from "../entities/Ecogesture";
import { Context } from "../types/Context";
import { UserChallenge } from "../entities/UserChallenge";
import { Challenge } from "../entities/Challenge";

@InputType()
class PaginationInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}

interface UserEcogestureWhereCondition {
  user: { id: number };
  ecogesture: { id: number };
  challenge?: { id: number };
}

@ObjectType()
class ValidatedEcogesturesResponse {
  @Field(() => [UserEcogesture])
  userEcogestures: UserEcogesture[];

  @Field(() => Int)
  totalCount: number;
}

@Resolver()
export class UserEcogestureResolver {
  @Query(() => ValidatedEcogesturesResponse)
  @Authorized()
  async getValidatedEcogestures(
    @Arg("input", () => PaginationInput, { nullable: true })
    input: PaginationInput,
    @Ctx() ctx: Context,
  ): Promise<ValidatedEcogesturesResponse> {
    const userId = ctx.user?.id;
    if (!userId) throw new Error("Utilisateur non connecté");

    const page = input?.page ?? 1;
    const limit = input?.limit ?? 5;
    const skip = (page - 1) * limit;

    const [userEcogestures, totalCount] = await UserEcogesture.findAndCount({
      where: { user: { id: userId } },
      skip,
      take: limit,
      relations: ["ecogesture", "user"],
      order: { validated_at: "DESC" },
    });

    return {
      userEcogestures,
      totalCount,
    };
  }

  @Mutation(() => UserEcogesture)
  @Authorized()
  async validateEcogesture(
    @Arg("ecogestureId", () => Int) ecogestureId: number,
    @Arg("level_validated", () => Int) level_validated: number,
    @Ctx() ctx: Context,
    @Arg("challengeId", () => Int, { nullable: true }) challengeId?: number,
  ): Promise<UserEcogesture> {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if the user is participating in the challenge
    if (challengeId) {
      const userChallenge = await UserChallenge.findOne({
        where: {
          user: { id: userId },
          challenge: { id: challengeId },
        },
      });

      if (!userChallenge) {
        throw new Error("You are not participating in this challenge");
      }
    }

    const whereCondition: UserEcogestureWhereCondition = {
      user: { id: userId },
      ecogesture: { id: ecogestureId },
    };

    if (challengeId) {
      whereCondition.challenge = { id: challengeId };
    }

    // Check if a validation already exists for this user
    const existingUserEcogesture = await UserEcogesture.findOne({
      where: whereCondition,
      relations: ["ecogesture", "user", "challenge"],
    });

    if (existingUserEcogesture) {
      // Update existing validation
      existingUserEcogesture.level_validated = level_validated;
      existingUserEcogesture.validated_at = new Date();
      return await existingUserEcogesture.save();
    } else {
      // Create a new validation
      const ecogestureEntity = await Ecogesture.findOneBy({ id: ecogestureId });
      const userEntity = await User.findOneBy({ id: userId });
      const challengeEntity = challengeId
        ? await Challenge.findOneBy({ id: challengeId })
        : null;

      if (!ecogestureEntity || !userEntity) {
        throw new Error("Ecogesture or User not found");
      }

      const newUserEcogesture = UserEcogesture.create({
        user: userEntity,
        ecogesture: ecogestureEntity,
        challenge: challengeEntity || undefined,
        level_validated,
        validated_at: new Date(),
      });

      return await newUserEcogesture.save();
    }
  }
}
