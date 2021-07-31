import client from "../apollo-client";
import { userStatuses } from "../constants";
import { SEARCH_USERS, UPDATE_USER } from "../gql/User";

export async function banUser(selectedUser) {
  const { data } = await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      status: userStatuses.banned,
      email: selectedUser,
    },
  });
  return data;
}

export async function searchUsersReq(text) {
  const {
    data: { searchUsers },
  } = await client.query({
    query: SEARCH_USERS,
    variables: {
      text,
    },
  });
  return searchUsers;
}

export default {
  banUser,
  searchUsersReq,
};
