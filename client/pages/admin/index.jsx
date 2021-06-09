import { gql } from "@apollo/client";
import { Box, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { defineMessages, useIntl } from "react-intl";

import client from "../../apollo-client";
import Autocomplete from "../../components/Autocomplete";
import BanUserModal from "../../components/BanUserModal";
import RequestsList from "../../components/RequestsList";
import SectionContainer from "../../components/SectionContainer";
import UsersList from "../../components/UsersList";
import locales from "../../content/locale";
import { mapAsOption } from "../../helpers";

const messages = defineMessages({
  requestManagement: {
    id: "request-management",
    description: locales.en["request-management"],
    defaultMessage: locales.en["request-management"],
  },
  userManagement: {
    id: "user-management",
    description: locales.en["user-management"],
    defaultMessage: locales.en["user-management"],
  },
  pendingRequests: {
    id: "pending-requests",
    description: locales.en["pending-requests"],
    defaultMessage: locales.en["pending-requests"],
  },
  rejectedRequests: {
    id: "rejected-requests",
    description: locales.en["rejected-requests"],
    defaultMessage: locales.en["rejected-requests"],
  },
  bannedUsers: {
    id: "banned-users",
    description: locales.en["banned-users"],
    defaultMessage: locales.en["banned-users"],
  },
  noRequests: {
    id: "no-requests",
    description: locales.en["no-requests"],
    defaultMessage: locales.en["no-requests"],
  },
  noUsers: {
    id: "no-users",
    description: locales.en["no-users"],
    defaultMessage: locales.en["no-users"],
  },
});

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formatMessage } = useIntl();
  const [banned, setBanned] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const { locale, defaultLocale, push } = useRouter();

  useEffect(async () => {
    const email = cookie.get("email");
    if (!email) {
      push(`${locale !== defaultLocale ? locale : ""}/`);
      return;
    }
    const { data } = await client.query({
      query: gql`
        query getUser($email: String!) {
          getUser(email: $email) {
            status
          }
        }
      `,
      variables: {
        email,
      },
    });
    if (!data.getUser) {
      push(`${locale !== defaultLocale ? locale : ""}/`);
      return;
    }
    if (data.getUser.status !== "admin") {
      push(`${locale !== defaultLocale ? locale : ""}/`);
      return;
    }

    const { data: adminData } = await client.query({
      query: gql`
        query getAdminData(
          $status1: String!
          $status2: String!
          $limit: Float!
          $userStatus: String!
        ) {
          pendingChats: getGroupChatByStatus(status: $status1) {
            id
            name
          }
          rejectedChats: getGroupChatByStatus(status: $status2) {
            id
            name
          }
          users: getUsers(limit: $limit) {
            email
          }
          bannedUsers: getUsers(status: $userStatus) {
            email
          }
        }
      `,
      variables: {
        status1: "pending",
        status2: "rejected",
        limit: 50,
        userStatus: "banned",
      },
    });
    setPending(adminData.pendingChats);
    setRejected(adminData.rejectedChats);
    setBanned(adminData.bannedUsers);
    setUsers(adminData.users);
  }, []);

  const modifyRequest = async (id, status) => {
    const {
      data: {
        updateGroupChat: { name, id: groupChatId },
      },
    } = await client.mutate({
      mutation: gql`
        mutation updateGroupChat($id: String!, $status: String!) {
          updateGroupChat(id: $id, status: $status) {
            name
            id
          }
        }
      `,
      variables: {
        id,
        status,
      },
    });
    if (status === "rejected") {
      setRejected((rejectedGroups) => [
        ...rejectedGroups,
        { id: groupChatId, name },
      ]);
    }
    setPending((pendingGroups) =>
      pendingGroups.filter((chat) => chat.id !== groupChatId)
    );
    toast({
      description: `Request ${name} has been ${status}`,
      status: status === "approved" ? "success" : "error",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  };

  const searchForUsers = async (text) => {
    const {
      data: { searchUsers },
    } = await client.query({
      query: gql`
        query searchUsers($text: String!) {
          searchUsers(text: $text) {
            email
          }
        }
      `,
      variables: {
        text,
      },
    });
    return mapAsOption(searchUsers, "email");
  };

  const onSelectUser = (user) => {
    if (user) {
      setSelectedUser(user.value);
      onOpen();
    }
  };

  return (
    <div className="page-container">
      <SectionContainer height="">
        <Heading alignSelf="flex-start">
          {formatMessage(messages.requestManagement)}
        </Heading>
        <RequestsList
          heading={formatMessage(messages.pendingRequests)}
          noItemsText={formatMessage(messages.noRequests)}
          items={pending}
          showRequestBtns
          modifyRequest={modifyRequest}
        />
        <RequestsList
          heading={formatMessage(messages.rejectedRequests)}
          noItemsText={formatMessage(messages.noRequests)}
          items={rejected}
        />
        <Heading alignSelf="flex-start" mb={4}>
          {formatMessage(messages.userManagement)}
        </Heading>
        <Box justifyContent="flex-start" w="100%">
          <Autocomplete
            name="Search Users"
            options={mapAsOption(users, "email")}
            onSearch={searchForUsers}
            onSelect={onSelectUser}
          />
        </Box>
        <UsersList
          heading={formatMessage(messages.bannedUsers)}
          noItemsText={formatMessage(messages.noUsers)}
          items={banned}
        />
        <BanUserModal
          isOpen={isOpen}
          onClose={onClose}
          selectedUser={selectedUser}
        />
      </SectionContainer>
    </div>
  );
}
