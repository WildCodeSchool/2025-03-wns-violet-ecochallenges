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

    const parseDate = (date: string | Date) => {
      if (typeof date === "string") {
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return new Date(date + "T00:00:00.00Z");
          }
          if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
          return new Date(date.replace(" ", "T") + ".00Z");
          }
          return new Date(date);
      }
      return new Date(date.toISOString());
    };

    const challenge = Challenge.create({
        label: data.label,
        startingDate: parseDate(data.startingDate),
        endingDate: parseDate(data.endingDate),
        picture: data.picture,
    });

    await challenge.save();
    return challenge;
  }
}
