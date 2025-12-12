import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { IsDate, IsNotEmpty, MinLength, validate } from "class-validator";
import { plainToClass, Type } from "class-transformer";
import { In } from "typeorm";
import { Challenge } from "../entities/Challenge";
import { Ecogesture } from "../entities/Ecogesture";

@InputType()
export class NewChallengeInput {
  @Field()
  @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
  @MinLength(3, { message: "Le titre doit faire au moins 3 caractères" })
  label: string;

  @Field()
  description: string;

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

  @Field(() => [Number])
  ecogestureIds: number[];
}

@Resolver(Challenge)
export default class ChallengeResolver {
  @Query(() => [Challenge])
  async getAllChallenges() {
    const challenges = await Challenge.find({
      relations: ["ecogestures"]
    });
    return challenges;
  }

  @Mutation(() => Challenge)
  async createChallenge(@Arg("data") data: NewChallengeInput) {
    const input = plainToClass(NewChallengeInput, data);

    const errors = await validate(input);
    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      throw new Error(messages.join(", "));
    }

    // Récupérer les écogestes sélectionnés
    const ecogestures = await Ecogesture.find({
      where: { id: In(data.ecogestureIds) }
    });

    const challenge = Challenge.create({
      label: data.label,
      description: data.description,
      startingDate: data.startingDate,
      endingDate: data.endingDate,
      picture: data.picture,
      ecogestures,
    });

    await challenge.save();
    return challenge;
  }
}
