import { gql } from "@apollo/client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import locales from "../content/locale";

const messages = defineMessages({
  confirm: {
    id: "confirm",
    description: locales.en.confirm,
    defaultMessage: locales.en.confirm,
  },
  deleteMessage: {
    id: "delete-message",
    description: locales.en.deleteMessage,
    defaultMessage: locales.en.deleteMessage,
  },
});

export default function DeleteChatModal({ isOpen, onClose, id }) {
  const toast = useToast();
  const { formatMessage } = useIntl();
  const deleteAction = async () => {
    const {
      data: { deleteGroupChat: deleteResult },
    } = await client.mutate({
      mutation: gql`
        mutation deleteGroupChat($id: String!) {
          deleteGroupChat(id: $id)
        }
      `,
      variables: {
        id,
      },
    });
    if (deleteResult) {
      toast({
        title: "Success",
        description: `Chat has been deleted`,
        status: "success",
        position: "bottom-left",
        duration: 5000,
        isClosable: false,
      });
    }
    onClose();
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formatMessage(messages.deleteMessage)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody alignContent="center">
          <Button colorScheme="red" onClick={deleteAction}>
            {formatMessage(messages.confirm)}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}