import {
  Button,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";

import { messages } from "../constants/intl/components/ChatInfo";
import { checkAdminOrCreated } from "../helpers/permissions";
import CheckPermissions from "./CheckPermissions";
import DeleteChatModal from "./DeleteChatModal";
import EditChatModal from "./EditChatModal";
import LinkIconBar from "./LinkIconBar";

function getLinkMetadata(url) {
  const { formatMessage } = useIntl();
  if (url.includes("chat.whatsapp.com")) {
    return {
      label: formatMessage(messages.joinWhatsapp),
      icon: "whatsapp",
    };
  }
  if (url.includes("linktr.ee")) {
    return {
      label: formatMessage(messages.visitLinktree),
      icon: "linktree",
    };
  }
  if (url.includes("slack")) {
    return {
      label: formatMessage(messages.joinSlack),
      icon: "slack",
    };
  }
  return {
    label: formatMessage(messages.joinDiscord),
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
  created,
  updated,
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
        {formatMessage(messages.created)}:{" "}
        {new Intl.DateTimeFormat("en-GB").format(new Date(created))}
      </Text>
      {updated && (
        <Text fontSize="sm" color="grey" m={2}>
          {formatMessage(messages.lastModified)}:{" "}
          {new Intl.DateTimeFormat("en-GB").format(new Date(updated))}
        </Text>
      )}
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
    <Image
      alt="Chat image"
      src={image}
      placeholder="/logo.png"
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
  created,
  updated,
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
      created={created}
      updated={updated}
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
