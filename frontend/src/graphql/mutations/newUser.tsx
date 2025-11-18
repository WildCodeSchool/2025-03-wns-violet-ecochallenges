export const SIGNUP_MUTATION = `
  mutation Signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;