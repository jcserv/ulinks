import { defineMessages } from "react-intl";

import locales from "../../locale";

export const messages = defineMessages({
  discover: {
    id: "discover",
    description: locales.en.discover,
    defaultMessage: locales.en.discover,
  },
  findGroupchats: {
    id: "find-groupchats",
    description: locales.en["find-groupchats"],
    defaultMessage: locales.en["find-groupchats"],
  },
  all: {
    id: "all",
    description: locales.en.all,
    defaultMessage: locales.en.all,
  },
  courses: {
    id: "courses",
    description: locales.en.courses,
    defaultMessage: locales.en.courses,
  },
  communities: {
    id: "communities",
    description: locales.en.communities,
    defaultMessage: locales.en.communities,
  },
  viewMore: {
    id: "view-more",
    description: locales.en["view-more"],
    defaultMessage: locales.en["view-more"],
  },
  search: {
    id: "search",
    description: locales.en.search,
    defaultMessage: locales.en.search,
  },
  noChats: {
    id: "no-chats",
    description: locales.en["no-chats"],
    defaultMessage: locales.en["no-chats"],
  },
});

export default {
  messages,
};
