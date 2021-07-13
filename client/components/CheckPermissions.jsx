import cookie from "js-cookie";
import React, { useEffect, useState } from "react";

import client from "../apollo-client";
import { GET_USER } from "../gql/User";

export default function CheckPermissions({ id, children }) {
  const [editPermissions, setEditPermissions] = useState(false);
  useEffect(async () => {
    const email = cookie.get("email");
    if (email) {
      const { data } = await client.query({
        query: GET_USER,
        variables: {
          email,
        },
      });
      if (!data.getUser) {
        return;
      }
      if (
        data.getUser.status === "admin" ||
        data.getUser?.groupChatsCreated?.includes(id)
      ) {
        setEditPermissions(true);
      }
    }
  }, []);
  return <>{editPermissions && children}</>;
}
