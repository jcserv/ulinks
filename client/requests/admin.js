import client from "../apollo-client";
import { statuses, userStatuses } from "../constants";
import { GET_ADMIN_DATA } from "../gql";

export async function getAdminData() {
  const { data: adminData } = await client.query({
    query: GET_ADMIN_DATA,
    variables: {
      status1: statuses.pending,
      status2: statuses.rejected,
      limit: 50,
      userStatus: userStatuses.banned,
    },
  });
  return adminData;
}

export default {
  getAdminData,
};
