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

// eslint-disable-next-line camelcase
export const createMockContributor = ({ login, avatar_url, html_url }) => ({
  login,
  avatar_url,
  html_url,
});

export default {
  createMockContributor,
  createMockGroupChat,
  createMockUser,
};
