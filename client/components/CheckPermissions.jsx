import cookie from "js-cookie";
import React, { useEffect, useState } from "react";

export default function CheckPermissions({ data, permissionCheck, children }) {
  const [editPermissions, setEditPermissions] = useState(false);
  useEffect(async () => {
    const email = cookie.get("email");
    if (email) {
      if (await permissionCheck({ ...data, email })) setEditPermissions(true);
    }
  }, []);
  return <>{editPermissions && children}</>;
}
