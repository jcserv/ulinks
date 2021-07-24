export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function mapAsOption(items, field) {
  return items.map((item) => ({ label: item[field], value: item[field] }));
}

export const redirect = (path, push, locale, defaultLocale) => {
  push(`${locale !== defaultLocale ? locale : ""}${path}`);
};

export default {
  mapAsOption,
  removeDuplicates,
};
