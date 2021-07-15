import { gql } from "@apollo/client";

export const ADD_GROUPCHAT = gql`
  mutation addGroupChat($email: String!, $info: createGroupChatInput!) {
    groupChat: addGroupChat(email: $email, info: $info) {
      id
      name
    }
  }
`;

export const GET_GROUPCHAT = gql`
  query getGroupChat($id: String!) {
    getGroupChat(id: $id) {
      id
      name
      description
      status
      isCommunity
      links
      image
      courseInformation {
        year
        term
        code
        department
        campus
      }
    }
  }
`;

export const GET_GROUPCHATS = gql`
  query getGroupChats {
    groupChats: getGroupChats {
      groupChats {
        name
        description
        links
        image
        id
        isCommunity
      }
      totalPages
      pageNumber
    }
  }
`;

export const GET_GROUPCHAT_IDS = gql`
  query getAllGroupChatIds {
    getAllGroupChatIds {
      groupChats
    }
  }
`;

export const SEARCH_GROUPCHATS = gql`
  query searchGroupChats($page: Float, $text: String, $isCommunity: Boolean) {
    groupChats: searchGroupChats(
      page: $page
      text: $text
      isCommunity: $isCommunity
    ) {
      groupChats {
        name
        description
        image
        links
        id
        isCommunity
      }
      totalPages
      pageNumber
    }
  }
`;

export const SEARCH_ALL_GROUPCHATS = gql`
  query searchGroupChats($page: Float, $text: String) {
    groupChats: searchGroupChats(page: $page, text: $text) {
      groupChats {
        name
        description
        image
        links
        id
        isCommunity
      }
      totalPages
      pageNumber
    }
  }
`;

export const ADVANCED_SEARCH_GROUPCHATS = gql`
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
        image
        isCommunity
        links
        id
      }
    }
  }
`;

export const UPDATE_GROUPCHAT_STATUS = gql`
  mutation updateStatus($id: String!, $status: String!) {
    updateStatus(id: $id, status: $status) {
      name
      id
    }
  }
`;

export const UPDATE_GROUPCHAT = gql`
  mutation updateGroupChat($id: String!, $chatInfo: createGroupChatInput!) {
    groupChat: updateGroupChat(id: $id, chatInfo: $chatInfo) {
      id
      name
      description
      links
      isCommunity
      status
      image
      courseInformation {
        campus
        department
        code
        term
        year
      }
    }
  }
`;

export default {
  ADD_GROUPCHAT,
  GET_GROUPCHAT,
  GET_GROUPCHATS,
  GET_GROUPCHAT_IDS,
  SEARCH_GROUPCHATS,
  ADVANCED_SEARCH_GROUPCHATS,
  UPDATE_GROUPCHAT_STATUS,
  UPDATE_GROUPCHAT,
};
