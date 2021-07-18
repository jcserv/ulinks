import { defineMessages } from "react-intl";

import locales from "../../../content/locale";

export const messages = defineMessages({
  createAcct: {
    id: "create-acct",
    description: locales.en["create-acct"],
    defaultMessage: locales.en.test,
  },
  emailAddress: {
    id: "email-address",
    description: locales.en["email-address"],
    defaultMessage: locales.en["email-address"],
  },
  emailHelperText: {
    id: "email-helper-text",
    description: locales.en["email-helper-text"],
    defaultMessage: locales.en["email-helper-text"],
  },
  password: {
    id: "password",
    description: locales.en.password,
    defaultMessage: locales.en.password,
  },
  confirmPassword: {
    id: "confirm-password",
    description: locales.en["confirm-password"],
    defaultMessage: locales.en["confirm-password"],
  },
});

export default {
  messages,
};
