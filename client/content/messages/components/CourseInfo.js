import { defineMessages } from "react-intl";

import locales from "../../locale";

export const messages = defineMessages({
  submit: {
    id: "submit",
    description: locales.en.submit,
    defaultMessage: locales.en.submit,
  },
  campus: {
    id: "campus",
    description: locales.en.campus,
    defaultMessage: locales.en.campus,
  },
  department: {
    id: "department",
    description: locales.en.department,
    defaultMessage: locales.en.department,
  },
  code: {
    id: "code",
    description: locales.en.code,
    defaultMessage: locales.en.code,
  },
  term: {
    id: "term",
    description: locales.en.term,
    defaultMessage: locales.en.term,
  },
  year: {
    id: "year",
    description: locales.en.year,
    defaultMessage: locales.en.year,
  },
  course: {
    id: "course",
    description: locales.en.course,
    defaultMessage: locales.en.course,
  },
  advancedSearch: {
    id: "advanced-search",
    description: locales.en["advanced-search"],
    defaultMessage: locales.en["advanced-search"],
  },
  selectCampus: {
    id: "select-campus",
    description: locales.en["select-campus"],
    defaultMessage: locales.en["select-campus"],
  },
  selectDepartment: {
    id: "select-department",
    description: locales.en["select-department"],
    defaultMessage: locales.en["select-department"],
  },
  selectTerm: {
    id: "select-term",
    description: locales.en["select-term"],
    defaultMessage: locales.en["select-term"],
  },
  selectYear: {
    id: "select-year",
    description: locales.en["select-year"],
    defaultMessage: locales.en["select-year"],
  },
});

export default {
  messages,
};
