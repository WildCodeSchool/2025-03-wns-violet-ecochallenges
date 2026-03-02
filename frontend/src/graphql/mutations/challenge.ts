import { gql } from "@apollo/client";

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: NewChallengeInput!) {
    createChallenge(data: $data) {
      id
      label
      description
      startingDate
      endingDate
      pictureUrl
      createdBy {
        id
        username
      }
      ecogestures {
        id
        label
        pictureUrl
      }
    }
  }
`;
