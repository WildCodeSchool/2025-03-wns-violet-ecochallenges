import {gql} from "@apollo/client";

// export const CHALLENGE_MUTATION = gql`
//   mutation CreateChallenge($data: NewChallengeInput!, $createdBy: Int!) {
//     createChallenge(data: $data, createdBy: $createdBy) {
//       id
//       label
//       description
//       startingDate
//       endingDate
//       picture
//     }
//   }
// `;


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