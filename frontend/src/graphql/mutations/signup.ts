import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;
