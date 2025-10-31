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
import { Context, UserProfile } from "../types/Context";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { IsEmail, Matches, MinLength } from "class-validator";

@InputType()
class NewUserInput {
  @Field()
  //TODO vérif email
  @IsEmail({}, { message: "Format de l'email invalide" })
  email: string;

  @Field()
  @MinLength(8, { message: "Le mot de passe doit faire au moins 8 caractères" })
  @Matches(/^\S*$/, {
    message: "Le mot de passe ne doit pas contenir d'espaces",
  })
  @Matches(/[a-z]/, {
    message: "Le mot de passe doit contenir au moins une minuscule",
  })
  @Matches(/[A-Z]/, {
    message: "Le mot de passe doit contenir au moins une majuscule",
  })
  @Matches(/[\d]/, {
    message: "Le mot de passe doit contenir au moins un chiffre",
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Le mot de passe doit contenir au moins un caractère spécial",
  })
  password: string;
}

function setCookie(ctx: Context, token: string) {
  ctx.res.setHeader(
    "Set-Cookie",
    `eco-auth=${token};secure;httpOnly;SameSite=Strict;`
  );
}

function createJwt(payload: UserProfile) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
}

export function createUserProfile(user: User): UserProfile {
  const profile: UserProfile = {
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
    const payload = createUserProfile(user);
    const token = createJwt(payload);
    setCookie(ctx, token);

    //TODO : add avatar
    const publicProfile = {
      email: user.email,
      roles: user.roles,
      username,
    };

    return JSON.stringify(publicProfile);
  }

  @Mutation(() => String)
  async login(@Arg("data") data: NewUserInput, @Ctx() ctx: Context) {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) throw new Error("Invalid user or password");

    const isValid = await argon2.verify(user.hashedPassword, data.password);
    //TODO return error to front "user or password not valid"
    if (!isValid) throw new Error("Invalid user or password");

    const payload = createUserProfile(user);
    const token = createJwt(payload);
    setCookie(ctx, token);

    return token;
  }

  //TODO manual test with front
  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    setCookie(ctx, "");

    return `Logged out`;
  }
}
