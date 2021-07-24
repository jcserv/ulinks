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

import { banUser } from "../requests/users";

export default function BanUserModal({ isOpen, onClose, selectedUser }) {
  const toast = useToast();
  const onClick = async () => {
    const data = await banUser(selectedUser);
    if (!data.updateUser) {
      toast({
        description: "Request has failed",
        status: "error",
        position: "bottom-left",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        description: `User ${selectedUser} has been banned`,
        status: "success",
        position: "bottom-left",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ban User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to ban {selectedUser}?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClick}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
