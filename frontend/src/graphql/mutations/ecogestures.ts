import { gql } from "@apollo/client";

export const SEED_ECOGESTURES = gql`
  mutation SeedEcogestures {
    seedEcogestures {
      id
      label
      description
      pictureUrl
      level1Expectation
      level2Expectation
      level3Expectation
    }
  }
`;

export const CLEAN_ECOGESTURES = gql`
  mutation CleanEcogestures {
    cleanEcogestures
  }
`;
