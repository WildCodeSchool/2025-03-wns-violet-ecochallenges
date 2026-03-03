import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($search: String!, $page: Int, $limit: Int) {
    searchUsers(search: $search, page: $page, limit: $limit) {
      totalCount
      users {
        id
        username
        email
        pictureUrl
      }
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      username
      roles
      pictureUrl
    }
  }
`;
