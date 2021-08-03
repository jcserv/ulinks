import client from "../apollo-client";
import { LOGIN, SIGNUP } from "../gql";
import { getRequest } from "../helpers";

export async function login(email, password) {
  const {
    data: {
      login: { status, jwtToken },
    },
  } = await client.query({
    query: LOGIN,
    variables: { email, password },
  });
  return { status, jwtToken };
}

export async function register(email, password) {
  const {
    data: {
      signup: { status, jwtToken },
    },
  } = await client.mutate({
    mutation: SIGNUP,
    variables: { email, password },
  });
  return { status, jwtToken };
}

export async function resendVerificationEmail(email) {
  const data = await getRequest(`/resend/${email}/`);
  return data;
}

export default {
  login,
  register,
};
