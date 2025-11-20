import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { IsNotEmpty, MinLength, validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Challenge } from "../entities/Challenge";

@InputType()
export class NewChallengeInput {
  @Field()
  @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
  @MinLength(3, { message: "Le titre doit faire au moins 3 caractères" })
  label: string;

  @Field()
  startingDate: Date;

  @Field()
  endingDate: Date;

  @Field()
  picture: string;
}

@Resolver(Challenge)
export default class ChallengeResolver {

  @Query(() => [Challenge])
  async getAllChallenges() {
      const challenges = await Challenge.find();
      return challenges;
  }

  @Mutation(() => Challenge)
  async createChallenge(@Arg("data") data: NewChallengeInput) {
    // Validation manuelle
    const input = plainToClass(NewChallengeInput, data);
    const errors = await validate(input);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      throw new Error(messages.join(", "));
    }

    const challenge = Challenge.create({
      label: data.label,
      startingDate: data.startingDate,
      endingDate: data.endingDate,
      picture: data.picture,
    });

    await challenge.save();
    return challenge;
  }
}
