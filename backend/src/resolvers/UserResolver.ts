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
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  validate,
} from "class-validator";
import { plainToClass } from "class-transformer";

@InputType()
class NewUserInput {
  @Field()
  @IsEmail({}, { message: "Format de l'email invalide" })
  @IsNotEmpty({ message: "L'email ne peut pas être vide" })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Le mot de passe ne peut pas être vide" })
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
    // Manual validation for direct resolver calls (e.g., in tests)
    // In production, TypeGraphQL's `validate: true` handles this automatically
    // Using plainToClass because data is an objet and must be an instance of NewUserInput for class-validator validate()
    const input = plainToClass(NewUserInput, data);
    const errors = await validate(input);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      throw new Error(messages.join(", "));
    }

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
    if (!user) throw new Error("Email ou mot de passe invalide.");

    const isValid = await argon2.verify(user.hashedPassword, data.password);
    if (!isValid) throw new Error("Email ou mot de passe invalide.");

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
