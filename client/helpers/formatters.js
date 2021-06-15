export const formatAsList = (str, index, arr, delimiter = ", ") =>
  `${str}${index !== arr.length - 1 ? delimiter : ""}`;

export default {
  formatAsList,
};
