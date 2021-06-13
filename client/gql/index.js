/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const GET_ADMIN_DATA = gql`
  query getAdminData(
    $status1: String!
    $status2: String!
    $limit: Float!
    $userStatus: String!
  ) {
    pendingChats: getGroupChatByStatus(status: $status1) {
      id
      name
    }
    rejectedChats: getGroupChatByStatus(status: $status2) {
      id
      name
    }
    users: getUsers(limit: $limit) {
      email
    }
    bannedUsers: getUsers(status: $userStatus) {
      email
    }
  }
`;
