import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($data: NewUserInput!) {
    login(data: $data) 
  }
`;
