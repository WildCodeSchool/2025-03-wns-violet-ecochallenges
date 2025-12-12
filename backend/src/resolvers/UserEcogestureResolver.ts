import { Resolver, Ctx, Query, Authorized } from "type-graphql";
import { UserEcogesture } from "../entities/UserEcogesture";
import { createUserPayload } from "./UserResolver";

// type UserPayload = {
//   id: number;
//   roles: string[];

// }

@Query(() => [UserEcogesture])
@Authorized()
async getValidatedEcogestures(
  @Ctx() ctx: UserPayload
): Promise <UserEcogesture[]> {


}

  }