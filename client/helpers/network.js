import axios from "axios";

const enforceTrailingSlash = (url) => (url.endsWith("/") ? url : `${url}/`);

export const serverUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000/";

export const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getRequest(
  uri,
  searchParams,
  url = serverUrl,
  config = baseConfig
) {
  const params = searchParams || "";
  return axios.get(enforceTrailingSlash(`${url}${uri}`) + params, config);
}

export function deleteRequest(uri, url = serverUrl, config = baseConfig) {
  return axios.delete(enforceTrailingSlash(`${url}${uri}`), config);
}

export function patchRequest(uri, data, url = serverUrl, config = baseConfig) {
  return axios.patch(enforceTrailingSlash(`${url}${uri}`), data, config);
}

export function postRequest(uri, data, url = serverUrl, config = baseConfig) {
  return axios.post(enforceTrailingSlash(`${url}${uri}`), data, config);
}
