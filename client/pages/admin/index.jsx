import { Box, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import client from "../../apollo-client";
import Autocomplete from "../../components/Autocomplete";
import BanUserModal from "../../components/BanUserModal";
import CheckPermissions from "../../components/CheckPermissions";
import RequestsList from "../../components/RequestsList";
import SectionContainer from "../../components/SectionContainer";
import UsersList from "../../components/UsersList";
import { messages } from "../../constants/intl/pages/admin";
import { GET_ADMIN_DATA } from "../../gql";
import { UPDATE_GROUPCHAT_STATUS } from "../../gql/GroupChat";
import { SEARCH_USERS } from "../../gql/User";
import { mapAsOption } from "../../helpers";
import { checkAdmin } from "../../helpers/permissions";

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formatMessage } = useIntl();
  const [banned, setBanned] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(async () => {
    const { data: adminData } = await client.query({
      query: GET_ADMIN_DATA,
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
        updateStatus: { name, id: groupChatId },
      },
    } = await client.mutate({
      mutation: UPDATE_GROUPCHAT_STATUS,
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
      query: SEARCH_USERS,
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
      <CheckPermissions permissionCheck={checkAdmin} redirectIfNoEmail redirect>
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
      </CheckPermissions>
    </div>
  );
}
