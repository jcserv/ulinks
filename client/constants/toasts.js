import { userStatuses } from "./config";

const baseToast = {
  position: "bottom-left",
  duration: 9000,
  isClosable: true,
};

const successToast = {
  ...baseToast,
  title: "Success",
  status: "success",
};

const errorToast = {
  ...baseToast,
  title: "Error",
  status: "error",
  isClosable: false,
};

export const CREATE_CHAT_SUCCESS = (isCommunity, status, groupChatName) => ({
  description: `${
    isCommunity && status !== userStatuses.admin
      ? "Request has been submitted"
      : `${groupChatName} has been created`
  }`,
  ...successToast,
});

export const DELETE_CHAT_SUCCESS = {
  description: "Chat has been deleted",
  ...successToast,
};

export const DELETE_CHAT_FAILURE = {
  description: "Unable to remove chat",
  ...errorToast,
};

export const EDIT_CHAT_SUCCESS = (groupChatName) => ({
  description: `${groupChatName} info has been changed`,
  ...successToast,
});

export const GENERIC_ERROR = {
  description: "An error has occurred, please try again.",
  ...errorToast,
};

export const LOGIN_FAILURE = {
  title: "Login unsuccessful",
  description: "Please try again.",
  ...errorToast,
};

export const LOGOUT_SUCCESS = {
  description: "Successfully logged out",
  ...successToast,
};

export const NO_RESULTS = {
  description: "No results returned, please try again.",
  ...errorToast,
};

export const REQUEST_RESULT = (name, status) => ({
  description: `Request ${name} has been ${status}`,
  status: status === "approved" ? "success" : "error",
  ...baseToast,
});

export const REQUEST_FAILED = {
  status: "error",
  ...errorToast,
};

export const RESULTS_RECEIVED = {
  description: "Search results returned",
  ...successToast,
};

export const USER_BANNED = (selectedUser) => ({
  description: `User ${selectedUser} has been banned`,
  ...successToast,
});

export const USER_EXISTS = {
  description: "User already exists",
  ...errorToast,
};
