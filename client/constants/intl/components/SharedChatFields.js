import { defineMessages } from "react-intl";

import locales from "../../../content/locale";

// Note: these are also used by EditChatModal

export const messages = defineMessages({
  name: {
    id: "name",
    description: locales.en.name,
    defaultMessage: locales.en.name,
  },
  description: {
    id: "description",
    description: locales.en.description,
    defaultMessage: locales.en.description,
  },
  gcNameTip: {
    id: "gc-name-tip",
    description: locales.en["gc-name-tip"],
    defaultMessage: locales.en["gc-name-tip"],
  },
});

export default {
  messages,
};
