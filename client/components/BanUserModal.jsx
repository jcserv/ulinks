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
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import { REQUEST_FAILED, USER_BANNED } from "../constants/toasts";
import locales from "../content/locale";
import { banUser } from "../requests/users";

const messages = defineMessages({
  banUser: {
    id: "ban-user",
    description: locales.en["ban-user"],
    defaultMessage: locales.en["ban-user"],
  },
  banConfirm: {
    id: "ban-confirmation",
    description: locales.en["ban-confirmation"],
    defaultMessage: locales.en["ban-confirmation"],
  },
  confirm: {
    id: "confirm",
    description: locales.en.confirm,
    defaultMessage: locales.en.confirm,
  },
});

export default function BanUserModal({ isOpen, onClose, selectedUser }) {
  const { formatMessage } = useIntl();
  const toast = useToast();
  const onClick = async () => {
    const data = await banUser(selectedUser);
    if (!data.updateUser) {
      toast(REQUEST_FAILED);
    } else {
      toast(USER_BANNED(selectedUser));
    }
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formatMessage(messages.banUser)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {`${formatMessage(messages.banConfirm)} ${selectedUser}?`}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClick}>
            {formatMessage(messages.confirm)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
