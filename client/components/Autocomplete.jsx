import React from "react";
import { defineMessages, useIntl } from "react-intl";
import AsyncSelect from "react-select/async";

import locales from "../content/locale";
import styles from "../styles/components/Autocomplete.module.css";

const messages = defineMessages({
  searchForUsers: {
    id: "search-for-users",
    description: locales.en["search-for-users"],
    defaultMessage: locales.en["search-for-users"],
  },
});

const Autocomplete = ({ name, options, onSearch, onSelect, ...props }) => {
  const { formatMessage } = useIntl();
  const loadOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(onSearch(inputValue));
      }, 1000);
    });

  return (
    <AsyncSelect
      name={name}
      cacheOptions
      defaultOptions={options}
      loadOptions={loadOptions}
      placeholder={formatMessage(messages.searchForUsers)}
      isClearable
      isSearchable
      onChange={(val) => onSelect(val)}
      className={styles.autocomplete}
      {...props}
    />
  );
};
export default Autocomplete;
