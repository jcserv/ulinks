import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import { DELETE_CHAT_FAILURE, DELETE_CHAT_SUCCESS } from "../constants";
import locales from "../content/locale";
import { deleteGroupChat } from "../requests";

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
  confirmDeletion: {
    id: "confirm-deletion",
    description: locales.en.confirmDeletion,
    defaultMessage: locales.en.confirmDeletion,
  },
});

export default function DeleteChatModal({ isOpen, onClose, id }) {
  const toast = useToast();
  const { formatMessage } = useIntl();
  const { locale, defaultLocale, push } = useRouter();

  const deleteAction = async () => {
    const deleteResult = await deleteGroupChat(id);
    if (deleteResult) {
      toast(DELETE_CHAT_SUCCESS);
      onClose();
      push(`${locale !== defaultLocale ? locale : ""}/`);
    } else {
      toast(DELETE_CHAT_FAILURE);
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
          {formatMessage(messages.confirmDeletion)}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={deleteAction}>
            {formatMessage(messages.confirm)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
