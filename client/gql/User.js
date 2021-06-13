/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      status
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
