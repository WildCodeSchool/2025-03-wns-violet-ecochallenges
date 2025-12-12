import {gql} from "@apollo/client";

export const GET_ECOGESTURES = gql`
  query GetEcogestures($input: GetEcogesturesInput) {
    getEcogestures(input: $input) {
      totalCount
      ecogestures {
        id
        label
        description
        pictureUrl
        level1Expectation
        level2Expectation
        level3Expectation
      }
    }
  }
`;
