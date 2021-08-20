import { defineMessages } from "react-intl";

import locales from "../../locale";

export const messages = defineMessages({
  details: {
    id: "details",
    description: locales.en.details,
    defaultMessage: locales.en.details,
  },
  created: {
    id: "created",
    description: locales.en.created,
    defaultMessage: locales.en.created,
  },
  lastModified: {
    id: "last-modified",
    description: locales.en["last-modified"],
    defaultMessage: locales.en["last-modified"],
  },
  edit: {
    id: "edit",
    description: locales.en.edit,
    defaultMessage: locales.en.details,
  },
  joinDiscord: {
    id: "join-discord",
    description: locales.en["join-discord"],
    defaultMessage: locales.en["join-discord"],
  },
  joinSlack: {
    id: "join-slack",
    description: locales.en["join-slack"],
    defaultMessage: locales.en["join-slack"],
  },
  joinWhatsapp: {
    id: "join-whatsapp",
    description: locales.en["join-whatsapp"],
    defaultMessage: locales.en["join-whatsapp"],
  },
  visitLinktree: {
    id: "visit-linktree",
    description: locales.en["visit-linktree"],
    defaultMessage: locales.en["visit-linktree"],
  },
});

export default {
  messages,
};
