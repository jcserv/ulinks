import { Box, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import {
  Autocomplete,
  BanUserModal,
  CheckPermissions,
  RequestsList,
  SectionContainer,
  UsersList,
} from "../../components";
import { REQUEST_RESULT } from "../../constants";
import { messages } from "../../content/messages/pages/admin";
import { mapAsOption } from "../../helpers";
import {
  checkAdmin,
  getAdminData,
  modifyGroupchatStatus,
  searchUsersReq,
} from "../../requests";

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
    const adminData = await getAdminData();
    setPending(adminData.pendingChats);
    setRejected(adminData.rejectedChats);
    setBanned(adminData.bannedUsers);
    setUsers(adminData.users);
  }, []);

  const modifyRequest = async (id, status) => {
    const { name, groupChatId, createdBy } = await modifyGroupchatStatus(
      id,
      status
    );
    if (status === "rejected") {
      setRejected((rejectedGroups) => [
        ...rejectedGroups,
        { id: groupChatId, name, createdBy },
      ]);
    }
    setPending((pendingGroups) =>
      pendingGroups.filter((chat) => chat.id !== groupChatId)
    );
    toast(REQUEST_RESULT(name, status));
  };

  const searchForUsers = async (text) => {
    const searchUsers = await searchUsersReq(text);
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
