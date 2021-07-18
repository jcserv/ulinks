import { Button, Heading, Image, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import locales from "../../content/locale";
import { redirect } from "../../helpers";
import { getRequest } from "../../helpers/network";

const messages = defineMessages({
  btnSuccess: {
    id: "continue",
    description: locales.en.continue,
    defaultMessage: locales.en.continue,
  },
  verificationSuccess: {
    id: "verificationSuccess",
    description: locales.en.verificationSuccess,
    defaultMessage: locales.en.verificationSuccess,
  },
  verificationFailure: {
    id: "verificationFailure",
    description: locales.en.verificationFailure,
    defaultMessage: locales.en.verificationFailure,
  },
});

export default function Verify({ status }) {
  const { formatMessage } = useIntl();
  const { locale, defaultLocale, push } = useRouter();

  return (
    <div className="page-container">
      <VStack justify="center">
        <Image src="/email.svg" height="400" width="600" />
        <Heading as="h1" size="xl" m={3}>
          {formatMessage(messages[`verification${status}`])}
        </Heading>
        <Button
          href="/login"
          className="w-50 mt-4"
          colorScheme="teal"
          onClick={() => redirect("/login", push, locale, defaultLocale)}
        >
          {formatMessage(messages.btnSuccess)}
        </Button>
      </VStack>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id.length !== 22) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await getRequest(`/verify/${id}`);
    return {
      props: {
        status: response.status === 200 ? "Success" : "Failure",
      },
    };
  } catch (e) {
    return {
      props: {
        status: "Failure",
      },
    };
  }
}
