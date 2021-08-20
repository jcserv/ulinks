import axios from "axios";

const enforceTrailingSlash = (url) => (url.endsWith("/") ? url : `${url}/`);

export const serverUrl = process.env.HOST || "http://localhost:4000";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getRequest(uri, searchParams) {
  const params = searchParams || "";
  return axios.get(enforceTrailingSlash(`${serverUrl}${uri}`) + params, config);
}

export function deleteRequest(uri) {
  return axios.delete(enforceTrailingSlash(`${serverUrl}${uri}`), config);
}

export function patchRequest(uri, data) {
  return axios.patch(enforceTrailingSlash(`${serverUrl}${uri}`), data, config);
}

export function postRequest(uri, data) {
  return axios.post(enforceTrailingSlash(`${serverUrl}${uri}`), data, config);
}

const GITHUB_API_URL = "https://api.github.com/repos/jcserv/ulinks";

const GITHUB_API_CONFIG = {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

export async function getContributors() {
  const response = await axios.get(
    `${GITHUB_API_URL}/contributors`,
    GITHUB_API_CONFIG
  );
  return response.data;
}
