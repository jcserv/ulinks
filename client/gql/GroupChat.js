/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const ADD_GROUPCHAT = gql`
  mutation addGroupChat($email: String!, $info: createGroupChatInput!) {
    groupChat: addGroupChat(email: $email, info: $info) {
      name
    }
  }
`;

export const GET_GROUPCHAT_QUERY = gql`
  query getGroupChat($id: String!) {
    getGroupChat(id: $id) {
      name
      description
      links
    }
  }
`;

export const GET_GROUPCHATS_QUERY = gql`
  query getGroupChats {
    groupChats: getGroupChats {
      groupChats {
        name
        description
        links
        id
        isCommunity
      }
      totalPages
      pageNumber
    }
  }
`;

export const GET_GROUPCHAT_IDS_QUERY = gql`
  query getAllGroupChatIds {
    getAllGroupChatIds {
      groupChats
    }
  }
`;

export const SEARCH_GROUPCHATS_QUERY = gql`
  query searchGroupChats($page: Float, $text: String, $isCommunity: Boolean) {
    groupChats: searchGroupChats(
      page: $page
      text: $text
      isCommunity: $isCommunity
    ) {
      groupChats {
        name
        description
        links
        id
      }
      totalPages
      pageNumber
    }
  }
`;

export const ADVANCED_SEARCH_GROUPCHATS_QUERY = gql`
  query searchGroupChats(
    $campus: String
    $department: String
    $code: String
    $term: String
    $year: String
  ) {
    groupChats: searchGroupChats(
      campus: $campus
      department: $department
      code: $code
      term: $term
      year: $year
    ) {
      groupChats {
        name
        description
        links
        id
      }
    }
  }
`;

export const UPDATE_GROUPCHAT = gql`
  mutation updateGroupChat($id: String!, $status: String!) {
    updateGroupChat(id: $id, status: $status) {
      name
      id
    }
  }
`;
