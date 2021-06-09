export default function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function mapAsOption(items, field) {
  return items.map((item) => ({ label: item[field], value: item[field] }));
}

export const createMockGroupChat = ({
  name,
  description,
  isCommunity,
  links,
  status,
  courseInfo,
}) => ({
  name,
  description,
  isCommunity,
  links,
  status,
  courseInfo,
});

export const createMockUser = ({ email, password, groupChats, status }) => ({
  email,
  password,
  groupChats,
  status,
});
