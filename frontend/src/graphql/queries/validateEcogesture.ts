import { gql } from "@apollo/client";

export const VALIDATE_ECOGESTURE = gql`
  mutation ValidateEcogesture($ecogestureId: Int!, $level_validated: Int!) {
    validateEcogesture(
      ecogestureId: $ecogestureId
      level_validated: $level_validated
    ) {
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
