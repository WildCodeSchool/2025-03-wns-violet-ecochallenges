import { gql } from "@apollo/client";

export const GET_CHALLENGE_BY_ID = gql`
  query getChallengeById($getChallengeById: Float!) {
    getChallengeById(id: $getChallengeById) {
      id
      label
      description
      pictureUrl
      startingDate
      endingDate
      ecogestures {
        id
        label
        description
        pictureUrl
        level1Expectation
        level2Expectation
        level3Expectation
      }
      participants {
        id
      }
      createdBy {
        id
      }
    }
  }
`;
