import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
@ObjectType()
class EcogestureListResponse {
  @Field(() => Number)
  totalCount: number;

  @Field(() => [Ecogesture])
  ecogestures: Ecogesture[];
}
import { Ecogesture } from "../entities/Ecogesture";

@InputType()
class GetEcogestureInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}

@Resolver(Ecogesture)
export default class EcogestureResolver {
  @Query(() => EcogestureListResponse)
  async getEcogestures(
    @Arg("input", () => GetEcogestureInput)
    { page = 1, limit = 5 }: GetEcogestureInput
  ): Promise<EcogestureListResponse> {
    const skip = (page - 1) * limit;

    const [ecogestures, totalCount] = await Ecogesture.findAndCount({
      skip,
      take: limit,
    });

    return { totalCount, ecogestures };
  }

  @Mutation(() => [Ecogesture])
  async seedEcogestures() {
    const ecogesturesData = [
      {
        label: "Réduire sa consommation de viande",
        description:
          "Adopter une alimentation plus végétarienne pour diminuer son empreinte carbone.",
        pictureUrl:
          "https://www.svgrepo.com/show/404334/meat-food-eat-cooking-bbq.svg",
        level1Expectation: "1 repas végétarien par semaine",
        level2Expectation: "3 repas végétariens par semaine",
        level3Expectation: "Tous les repas végétariens",
      },
      {
        label: "Utiliser des ampoules basse consommation",
        description:
          "Remplacer les ampoules classiques par des ampoules LED pour économiser de l'énergie.",
        pictureUrl: "https://www.svgrepo.com/show/513495/light-bulb-1.svg",
        level1Expectation: "Remplacer 2 ampoules de son logement",
        level2Expectation: "Remplacer 5 ampoules de son logement",
        level3Expectation: "Remplacer toutes les ampoules de son logement",
      },
      {
        label: "Réduire sa consommation d'eau",
        description:
          "Adopter des gestes simples pour économiser l'eau au quotidien.",
        pictureUrl: "https://www.svgrepo.com/show/247442/faucet.svg",
        level1Expectation: "Réduire sa consommation d'eau de 10%",
        level2Expectation: "Réduire sa consommation d'eau de 20%",
        level3Expectation: "Réduire sa consommation d'eau de 30%",
      },
      {
        label: "Privilégier les transports en commun",
        description:
          "Utiliser les transports en commun pour réduire les émissions de CO2.",
        pictureUrl: "https://www.svgrepo.com/show/513513/bus.svg",
        level1Expectation:
          "Utiliser les transports en commun 2 fois par semaine",
        level2Expectation:
          "Utiliser les transports en commun 4 fois par semaine",
        level3Expectation: "Utiliser les transports en commun tous les jours",
      },
      {
        label: "Réduire les déchets plastiques",
        description:
          "Adopter des alternatives au plastique pour diminuer sa production de déchets.",
        pictureUrl: "https://www.svgrepo.com/show/469607/recycle-bin-3.svg",
        level1Expectation: "Utiliser une gourde réutilisable",
        level2Expectation: "Utiliser des sacs réutilisables",
        level3Expectation: "Éviter tous les produits plastiques à usage unique",
      },
      {
        label: "Composter ses déchets organiques",
        description:
          "Mettre en place un compost pour réduire les déchets et enrichir le sol.",
        pictureUrl: "https://www.svgrepo.com/show/228551/bin-compost.svg",
        level1Expectation: "Composter 25% de ses déchets organiques",
        level2Expectation: "Composter 50% de ses déchets organiques",
        level3Expectation: "Composter 75% ou plus de ses déchets organiques",
      },
    ];

    const createdEcogestures = await Ecogesture.insert(ecogesturesData);
    return createdEcogestures.raw;
  }
}
