import {
  Resolver,
  Ctx,
  Query,
  Authorized,
  Mutation,
  Arg,
  Int,
} from "type-graphql";
import { UserEcogesture } from "../entities/UserEcogesture";
import { Context } from "../types/Context";

@Resolver()
export class UserEcogestureResolver {
  @Query(() => [UserEcogesture])
  @Authorized()
  async getValidatedEcogestures(
    @Ctx() ctx: Context
  ): Promise<UserEcogesture[]> {
    const userId = ctx.user?.id;
    if (!userId) throw new Error("Utilisateur non connecté");

    return await UserEcogesture.find({
      where: { userId },
      relations: ["ecogesture", "user"],
    }) as UserEcogesture[];
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

// TODO:
// 1. Créer un user
// 2. validateEcogesture: valider un ecogste sur Appolo ( ajouter dans Header: Authorization : "Bearer TOKEN RENVOYE" )
// 3. getValidatedEcogesture : vérifier la liste des éco-gestes validés sur appolo (ajouter dans Header: Authorization: "Bearer TOKEN RENVOYE")
