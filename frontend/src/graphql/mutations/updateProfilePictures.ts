import { gql } from "@apollo/client";

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfilePicture($data: UpdateProfilePictureInput!) {
    updateProfilePicture(data: $data) {
      id
      username
      email
      pictureUrl
    }
  }
`;
