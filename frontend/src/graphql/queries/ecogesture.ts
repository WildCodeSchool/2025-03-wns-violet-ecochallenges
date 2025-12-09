import { gql } from "@apollo/client";

export const GET_ECOGESTURES = gql`
  query GetEcogestures($input: GetEcogesturesInput) {
    getEcogestures(input: $input) {
      totalCount
      ecogestures {
        id
        label
        pictureUrl
      }
    }
  }
`;
