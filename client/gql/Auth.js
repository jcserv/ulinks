import { gql } from "@apollo/client";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      jwtToken
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      status
      jwtToken
    }
  }
`;

export default {
  LOGIN,
  SIGNUP,
};
