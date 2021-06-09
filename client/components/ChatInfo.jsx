import { Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import locales from "../content/locale";
import LinkIconBar from "./LinkIconBar";

const messages = defineMessages({
  details: {
    id: "details",
    description: locales.en.details,
    defaultMessage: locales.en.details,
  },
  created: {
    id: "created",
    description: locales.en.created,
    defaultMessage: locales.en.created,
  },
  lastModified: {
    id: "last-modified",
    description: locales.en["last-modified"],
    defaultMessage: locales.en["last-modified"],
  },
});

function transformLink(url) {
  return {
    label: url.includes("whatsapp") ? "WhatsApp" : "Discord",
    icon: url.includes("whatsapp") ? "whatsapp" : "discord",
    url,
  };
}

const ChatInfo = ({ name, description, links }) => {
  const { formatMessage } = useIntl();
  const linkIcons = links ? links.map((link) => transformLink(link)) : [];
  return (
    <div className="d-flex row-12 justify-content-center">
      <div className="col-6">
        <div className="col-6 m-auto">
          <Text fontSize="md" color="grey" m={2}>
            {formatMessage(messages.details)}
          </Text>
          <Heading as="h2" size="2xl" m={2}>
            {name}
          </Heading>
          <Text fontSize="md" color="grey" m={2}>
            {description}
          </Text>
          <LinkIconBar
            links={linkIcons}
            boxSize="2em"
            justify="flex-start"
            ml={2}
          />
          <Text fontSize="sm" color="grey" m={2}>
            {formatMessage(messages.created)}: 01/01/20
          </Text>
          <Text fontSize="sm" color="grey" m={2}>
            {formatMessage(messages.lastModified)}: 01/04/20
          </Text>
        </div>
      </div>

      <div className="col-6">
        <Img alt="Chat image" src="/python.png" />
      </div>
    </div>
  );
};

export default ChatInfo;
