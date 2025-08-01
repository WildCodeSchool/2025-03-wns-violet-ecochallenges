import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { Context, UserToken } from "../types/Context";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";

@InputType()
class NewUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

function setCookie(ctx: Context, token: string) {
  ctx.res.setHeader(
    "Set-Cookie",
    `tgc-auth=${token};secure;httpOnly;SameSite=Strict;`
  );
}

function createJwt(payload: UserToken) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
}

function createUserToken(user: User): UserToken {
  const profile: UserToken = {
    id: user.id,
    roles: user.roles,
  };
  return profile;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => String)
  async signup(@Arg("data") data: NewUserInput, @Ctx() ctx: Context) {
    const hashedPassword = await argon2.hash(data.password);
    const username = data.email.split("@")[0];
    const user = User.create({ ...data, hashedPassword, username });
    await user.save();
    const payload = createUserToken(user);
    const token = createJwt(payload);
    setCookie(ctx, token);

    const publicProfile = {
      email: user.email,
      //avatar: user.avatar,
      //name: user.name,
      roles: user.roles,
      username
    };

    return JSON.stringify(publicProfile);
  }
}
