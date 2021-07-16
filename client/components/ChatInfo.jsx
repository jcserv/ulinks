import {
  Button,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import locales from "../content/locale";
import { checkAdminOrCreated } from "../helpers/permissions";
import CheckPermissions from "./CheckPermissions";
import DeleteChatModal from "./DeleteChatModal";
import EditChatModal from "./EditChatModal";
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
  edit: {
    id: "edit",
    description: locales.en.edit,
    defaultMessage: locales.en.details,
  },
});

function getLinkMetadata(url) {
  if (url.includes("chat.whatsapp.com")) {
    return {
      label: "WhatsApp",
      icon: "whatsapp",
    };
  }
  if (url.includes("linktr.ee")) {
    return {
      label: "Linktree",
      icon: "linktree",
    };
  }
  return {
    label: "Discord",
    icon: "discord",
  };
}

function transformLink(url) {
  const data = getLinkMetadata(url);
  return {
    ...data,
    url,
  };
}

const ChatDetails = ({
  id,
  name,
  description,
  links,
  status,
  courseInformation,
  isCommunity,
  setChatInfo,
}) => {
  const { formatMessage } = useIntl();
  const linkIcons = links ? links.map((link) => transformLink(link)) : [];
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  return (
    <GridItem>
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
      <CheckPermissions data={{ id }} permissionCheck={checkAdminOrCreated}>
        <Button onClick={onModalOpen} m={1}>
          {formatMessage(messages.edit)}
        </Button>
        <Button colorScheme="red" onClick={onDeleteModalOpen} m={1}>
          Delete
        </Button>
      </CheckPermissions>
      <EditChatModal
        isOpen={isModalOpen}
        onOpen={onModalOpen}
        onClose={onModalClose}
        setChatInfo={setChatInfo}
        initialVals={{
          name,
          isCommunity,
          status,
          description,
          links,
          courseInformation,
        }}
        id={id}
      />
      <DeleteChatModal
        isOpen={isDeleteModalOpen}
        onOpen={onDeleteModalOpen}
        onClose={onDeleteModalClose}
        id={id}
      />
    </GridItem>
  );
};

const ChatImage = ({ image }) => (
  <GridItem>
    <Img
      alt="Chat image"
      src={
        image || "https://images.unsplash.com/photo-1415201179613-bd037ff5eb29"
      }
      width="400"
      height="400"
    />
  </GridItem>
);

const ChatInfo = ({
  id,
  name,
  description,
  links,
  status,
  courseInformation,
  isCommunity,
  image,
  setChatInfo,
}) => {
  const shouldAlternate = useBreakpointValue({ base: false, md: true });
  const img = <ChatImage image={image} />;
  const desc = (
    <ChatDetails
      id={id}
      name={name}
      description={description}
      links={links}
      status={status}
      courseInformation={courseInformation}
      isCommunity={isCommunity}
      setChatInfo={setChatInfo}
    />
  );
  return (
    <SimpleGrid
      pl="10%"
      pt="5%"
      pr="10%"
      spacing={12}
      columns={[1, null, 2]}
      justifyContent="center"
    >
      {shouldAlternate ? desc : img}
      {shouldAlternate ? img : desc}
    </SimpleGrid>
  );
};

export default ChatInfo;
