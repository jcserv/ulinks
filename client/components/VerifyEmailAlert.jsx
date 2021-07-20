import { Alert, AlertIcon, Center } from "@chakra-ui/react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { getUserData } from "../helpers/permissions";

export default function VerifyEmailAlert() {
  const email = cookie.get("email");
  const { locale } = useRouter();
  const [show, setShow] = useState(false);

  useEffect(async () => {
    if (!email) {
      return;
    }
    const data = await getUserData(email);
    if (!data) return;
    if (data.getUser.verified) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [email, locale]);

  return (
    show && (
      <Center pt={2}>
        <Alert status="warning" w="75%">
          <AlertIcon />
          Your account has not been verified. Please check your email to create
          group chat entries!
        </Alert>
      </Center>
    )
  );
}
