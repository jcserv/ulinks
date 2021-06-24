/* eslint-disable no-console */
import { postRequest } from "./network";

const imgurApiUrl = "https://api.imgur.com/";

const imgurClientId = process.env.REACT_APP_IMGUR_CLIENT_ID || "";

const imgurConfig = {
  headers: {
    Authorization: `Client-ID ${imgurClientId}`,
  },
};

export default async function postImage(file) {
  try {
    const fd = new FormData();
    fd.append("image", file);
    const res = await postRequest("/3/image", fd, imgurApiUrl, imgurConfig);
    return res;
  } catch (err) {
    console.log(err);
  }
  return false;
}
