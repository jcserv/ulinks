export const formatAsList = (str, index, arr, delimiter = ", ") =>
  `${str}${index !== arr.length - 1 ? delimiter : ""}`;

export const capitallize = (str) => `${str[0].toUpperCase() + str.slice(1)}`;

export default {
  capitallize,
  formatAsList,
};
