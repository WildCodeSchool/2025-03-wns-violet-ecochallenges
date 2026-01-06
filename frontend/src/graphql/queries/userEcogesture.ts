import { gql } from "@apollo/client";

export const GET_VALIDATED_ECOGESTURES = gql`
  query GetValidatedEcogestures($input: PaginationInput!) {
    getValidatedEcogestures(input: $input) {
      userEcogestures {
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
      totalCount
    }
  }
`;
