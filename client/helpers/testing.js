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

export default {
  createMockGroupChat,
  createMockUser,
};
