import { defineMessages } from "react-intl";

import locales from "../../../content/locale";

export const messages = defineMessages({
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

export default {
  messages,
};
