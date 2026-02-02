import {gql} from "@apollo/client";

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: NewChallengeInput!) {
    createChallenge(data: $data) {
      id
      label
      startingDate
      endingDate
      picture
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