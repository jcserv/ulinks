import { Button, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { Link } from "react-scroll";

import locales from "../content/locale";

const messages = defineMessages({
  getStarted: {
    id: "get-started",
    description: locales.en["get-started"],
    defaultMessage: locales.en["get-started"],
  },
  tagline: {
    id: "tagline",
    description: locales.en.tagline,
    defaultMessage: locales.en.tagline,
  },
  desc1: {
    id: "desc1",
    description: locales.en.desc1,
    defaultMessage: locales.en.desc1,
  },
  desc2: {
    id: "desc2",
    description: locales.en.desc2,
    defaultMessage: locales.en.desc2,
  },
});

const Welcome = () => {
  const { formatMessage } = useIntl();

  return (
    <div
      className="d-flex row-12 justify-content-center"
      style={{ height: "75vh", marginTop: "20vh" }}
    >
      <div className="col-6 align-items-center justify-self-center">
        <Heading as="h2" size="2xl" m={3}>
          {formatMessage(messages.tagline)}
        </Heading>
        <Text fontSize="md" color="grey" m={3}>
          {formatMessage(messages.desc1)}
        </Text>
        <Text fontSize="md" color="grey" m={3}>
          {formatMessage(messages.desc2)}
        </Text>
        <Text fontSize="md" color="grey" m={3}>
          <Link
            activeClass="active"
            to="discover"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            <Button variant="solid" colorScheme="teal" mt={2}>
              {formatMessage(messages.getStarted)}
            </Button>
          </Link>
        </Text>
      </div>

      <div className="col-6">
        <Img alt="Chat image" src="/smartphone.png" w="75%" />
      </div>
    </div>
  );
};

export default Welcome;
