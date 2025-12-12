import {gql} from "@apollo/client";

export const CHALLENGE_MUTATION = gql`
  mutation CreateChallenge($data: NewChallengeInput!) {
    createChallenge(data: $data) {
      id
      label
      description
      startingDate
      endingDate
      picture
      ecogestures {
        id
        label
      }
    }
  }
`;
