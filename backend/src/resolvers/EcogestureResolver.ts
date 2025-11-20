import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Ecogesture } from "../entities/Ecogesture";

@ObjectType()
class EcogestureListResponse {
  @Field(() => Number)
  totalCount: number;

  @Field(() => [Ecogesture])
  ecogestures: Ecogesture[];
}

@InputType()
class GetEcogesturesInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}

@Resolver(Ecogesture)
export default class EcogestureResolver {
  @Query(() => EcogestureListResponse)
  async getEcogestures(
    @Arg("input", () => GetEcogesturesInput, { nullable: true })
    input?: GetEcogesturesInput
  ): Promise<EcogestureListResponse> {
    const page = input?.page ?? 1;
    const limit = input?.limit ?? 5;
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
      {
        label: "Éteindre les appareils en veille",
        description:
          "Débrancher ou éteindre les appareils électriques pour économiser de l'énergie.",
        pictureUrl:
          "https://www.svgrepo.com/show/268556/off-button-power-button.svg",
        level1Expectation: "Éteindre les appareils en veille le soir",
        level2Expectation: "Éteindre les appareils en veille toute la journée",
        level3Expectation: "Ne pas laisser d'appareils en veille du tout",
      },
      {
        label: "Consommer local et de saison",
        description:
          "Acheter des produits locaux et de saison pour réduire l'empreinte carbone liée au transport.",
        pictureUrl: "https://www.svgrepo.com/show/530216/carrot.svg",
        level1Expectation: "Acheter 30% de produits locaux et de saison",
        level2Expectation: "Acheter 60% de produits locaux et de saison",
        level3Expectation:
          "Acheter 90% ou plus de produits locaux et de saison",
      },
      {
        label: "Tendre vers le zéro déchet",
        description:
          "Adopter des pratiques pour réduire au maximum la production de déchets.",
        pictureUrl: "https://www.svgrepo.com/show/356796/empty-trash.svg",
        level1Expectation: "Réduire ses déchets de 25%",
        level2Expectation: "Réduire ses déchets de 50%",
        level3Expectation: "Réduire ses déchets de 75% ou plus",
      },
      {
        label: "Influencer son entourage",
        description:
          "Sensibiliser et encourager son entourage à adopter des gestes écologiques.",
        pictureUrl:
          "https://www.svgrepo.com/show/289552/presentation-financial.svg",
        level1Expectation: "Parler d'écologie autour de soi",
        level2Expectation:
          "Devenir animateur/trice d'un groupe de discussion sur l'écologie",
        level3Expectation: "Animer des ateliers ou événements écologiques",
      },
      {
        label: "Planter des arbres ou un jardin",
        description:
          "Contribuer à la reforestation ou cultiver un jardin pour améliorer la biodiversité.",
        pictureUrl:
          "https://www.svgrepo.com/show/206104/sprout-growing-seed.svg",
        level1Expectation: "Planter 1 arbre ou créer un petit jardin",
        level2Expectation: "Planter 3 arbres ou agrandir son jardin",
        level3Expectation: "Planter 5 arbres ou créer un grand jardin",
      },
      {
        label: "Utiliser des produits ménagers écologiques",
        description:
          "Opter pour des produits de nettoyage respectueux de l'environnement.",
        pictureUrl: "https://www.svgrepo.com/show/469607/recycle-bin-3.svg",
        level1Expectation: "Utiliser des produits écologiques pour 1 pièce",
        level2Expectation: "Utiliser des produits écologiques pour 3 pièces",
        level3Expectation:
          "Utiliser des produits écologiques pour toute la maison",
      },
      {
        label: "Réparer au lieu de jeter",
        description:
          "Favoriser la réparation des objets pour prolonger leur durée de vie.",
        pictureUrl: "https://www.svgrepo.com/show/426195/fixing-repair.svg",
        level1Expectation: "Réparer 1 objet au lieu de le jeter",
        level2Expectation: "Réparer 3 objets au lieu de les jeter",
        level3Expectation: "Réparer 5 objets ou plus au lieu de les jeter",
      },
    ];

    await Ecogesture.insert(ecogesturesData);
    const allEcogestures = await Ecogesture.find();
    return allEcogestures;
  }
}
