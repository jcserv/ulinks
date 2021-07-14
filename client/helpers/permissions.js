import client from "../apollo-client";
import { userStatuses } from "../constants";
import { GET_USER } from "../gql/User";

export async function getUserData(email) {
  const { data } = await client.query({
    query: GET_USER,
    variables: {
      email,
    },
  });
  if (!data.getUser) {
    return null;
  }
  return data;
}

export async function checkAdmin({ email }) {
  const data = await getUserData(email);
  if (data?.getUser?.status === userStatuses.admin) {
    return true;
  }
  return false;
}

export async function checkAdminOrCreated({ id, email }) {
  const data = await getUserData(email);
  if (
    data?.getUser?.status === userStatuses.admin ||
    data?.getUser?.groupChatsCreated
      ?.map((groupChat) => groupChat.id)
      .includes(id)
  ) {
    return true;
  }
  return false;
}

export default {
  checkAdmin,
  checkAdminOrCreated,
};
