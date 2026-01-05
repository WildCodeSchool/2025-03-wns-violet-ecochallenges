import { gql } from "@apollo/client";

export const GET_MY_CHALLENGES = gql`
  query GetMyChallenges($input: GetMyChallengesInput) {
    getMyChallenges(input: $input) {
      challenges {
        id
        label
        startingDate
        endingDate
        picture
        status
        createdBy {
          id
          username
        }
        participants {
          id
        }
      }
      totalCount
    }
  }
`;
