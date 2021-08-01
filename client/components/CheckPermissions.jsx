import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function CheckPermissions({
  data,
  permissionCheck,
  children,
  redirectIfNoEmail = false,
  redirect = false,
  path = "",
}) {
  const [editPermissions, setEditPermissions] = useState(false);
  const { locale, defaultLocale, push } = useRouter();

  useEffect(async () => {
    const email = cookie.get("email");
    if (!email) {
      if (redirectIfNoEmail) {
        push(`${locale !== defaultLocale ? locale : ""}/${path}`);
      }
      return;
    }
    if (await permissionCheck({ ...data, email })) {
      setEditPermissions(true);
    } else if (redirect) {
      push(`${locale !== defaultLocale ? locale : ""}/${path}`);
    }
  }, []);
  return <>{editPermissions && children}</>;
}

export default CheckPermissions;
