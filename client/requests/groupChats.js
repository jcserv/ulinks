import client from "../apollo-client";
import {
  ADD_GROUPCHAT,
  ADVANCED_SEARCH_GROUPCHATS,
  DELETE_GROUPCHAT,
  GET_GROUPCHAT,
  SEARCH_ALL_GROUPCHATS,
  SEARCH_GROUPCHATS,
  UPDATE_GROUPCHAT_STATUS,
} from "../gql/GroupChat";

export async function advancedSearch(searchInfo) {
  const {
    data: {
      groupChats: { groupChats: newGroupChats },
    },
  } = await client.query({
    query: ADVANCED_SEARCH_GROUPCHATS,
    variables: searchInfo,
  });
  return newGroupChats;
}

export async function createChat(
  email,
  name,
  isCommunity,
  userStatus,
  description,
  links,
  courseInfo
) {
  const {
    data: { groupChat },
  } = await client.mutate({
    mutation: ADD_GROUPCHAT,
    variables: {
      email,
      info: {
        name,
        status: isCommunity && userStatus !== "admin" ? "pending" : "approved",
        description,
        links,
        isCommunity,
        ...(!isCommunity ? { courseInformation: courseInfo } : {}),
      },
    },
  });
  return groupChat;
}

export async function deleteGroupChat(id) {
  const {
    data: { deleteGroupChat: deleteResult },
  } = await client.mutate({
    mutation: DELETE_GROUPCHAT,
    variables: {
      id,
    },
  });
  return deleteResult;
}

export async function getGroupchatReq(id) {
  const {
    data: { getGroupChat },
  } = await client.query({
    query: GET_GROUPCHAT,
    variables: { id },
  });
  return getGroupChat;
}

export async function modifyGroupchatStatus(id, status) {
  const {
    data: {
      updateStatus: { name, id: groupChatId },
    },
  } = await client.mutate({
    mutation: UPDATE_GROUPCHAT_STATUS,
    variables: {
      id,
      status,
    },
  });
  return { name, groupChatId };
}

export async function searchChats(searchQuery, curIsCommunity, page) {
  const {
    data: {
      groupChats: {
        groupChats: newGroupChats,
        totalPages: newTotalPages,
        pageNumber: newPageNumber,
      },
    },
  } = await client.query({
    query: curIsCommunity === 0 ? SEARCH_ALL_GROUPCHATS : SEARCH_GROUPCHATS,
    variables: {
      page,
      ...(searchQuery === "" ? {} : { text: searchQuery }),
      ...(curIsCommunity !== 0 ? { isCommunity: curIsCommunity === 2 } : {}),
    },
  });
  return { newGroupChats, newTotalPages, newPageNumber };
}

export default {
  advancedSearch,
  createChat,
  deleteGroupChat,
  getGroupchatReq,
  searchChats,
};
