import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      status
      verified
      groupChatsCreated {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($status: String!, $email: String!) {
    updateUser(status: $status, email: $email) {
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($text: String!) {
    searchUsers(text: $text) {
      email
    }
  }
`;

export default {
  GET_USER,
  UPDATE_USER,
  SEARCH_USERS,
};
