import { defineMessages } from "react-intl";

import locales from "../../locale";

export const messages = defineMessages({
  admin: {
    id: "admin",
    description: locales.en.admin,
    defaultMessage: locales.en.admin,
  },
  create: {
    id: "create",
    description: locales.en.create,
    defaultMessage: locales.en.create,
  },
  login: {
    id: "login",
    description: locales.en.login,
    defaultMessage: locales.en.login,
  },
  logout: {
    id: "logout",
    description: locales.en.logout,
    defaultMessage: locales.en.logout,
  },
  register: {
    id: "register",
    description: locales.en.register,
    defaultMessage: locales.en.register,
  },
  languages: {
    id: "languages",
    description: locales.en.languages,
    defaultMessage: locales.en.languages,
  },
  toggleLightMode: {
    id: "toggle-light-mode",
    description: locales.en["toggle-light-mode"],
    defaultMessage: locales.en["toggle-light-mode"],
  },
  toggleDarkMode: {
    id: "toggle-dark-mode",
    description: locales.en["toggle-dark-mode"],
    defaultMessage: locales.en["toggle-dark-mode"],
  },
  resendVerificationEmail: {
    id: "resend-verification-email",
    description: locales.en["resend-verification-email"],
    defaultMessage: locales.en["resend-verification-email"],
  },
  settings: {
    id: "settings",
    description: locales.en.settings,
    defaultMessage: locales.en.settings,
  },
});

export default {
  messages,
};
