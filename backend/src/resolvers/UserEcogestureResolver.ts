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
import { Context } from "../types/Context";

@InputType()
class PaginationInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
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
    @Ctx() ctx: Context
  ): Promise<ValidatedEcogesturesResponse> {
    const userId = ctx.user?.id;
    if (!userId) throw new Error("Utilisateur non connecté");

    const page = input?.page ?? 1;
    const limit = input?.limit ?? 5;
    const skip = (page - 1) * limit;

    const [userEcogestures, totalCount] = await UserEcogesture.findAndCount({
      where: { userId },
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
    @Ctx() ctx: Context
  ): Promise<UserEcogesture> {
    const userId = ctx.user?.id;
    if (!userId) throw new Error("Utilisateur non connecté");

    const userEcogesture = UserEcogesture.create({
      userId,
      ecogestureId,
      validated_at: new Date(),
      level_validated,
    });

    await userEcogesture.save();

    return (await UserEcogesture.findOne({
      where: { id: userEcogesture.id },
      relations: ["ecogesture", "user"],
    })) as UserEcogesture;
  }
}
