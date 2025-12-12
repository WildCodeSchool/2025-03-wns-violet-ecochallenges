import { gql } from "@apollo/client";

export const GET_VALIDATED_ECOGESTURES = gql`
  query GetValidatedEcogestures {
    getValidatedEcogestures {
      id
      validated_at
      level_validated
      ecogesture {
        id
        label
        pictureUrl
      }
      user {
        id
      }
    }
  }
`;
