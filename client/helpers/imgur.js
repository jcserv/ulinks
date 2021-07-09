/* eslint-disable no-console */
import client from "../apollo-client";
import { UPDATE_GROUPCHAT_IMAGE } from "../gql/GroupChat";
import { postRequest } from "./network";

const imgurApiUrl = "https://api.imgur.com/";

const imgurClientId = process.env.REACT_APP_IMGUR_CLIENT_ID || "9010d4f0559ea08";

const imgurConfig = {
  headers: {
    Authorization: `Client-ID ${imgurClientId}`,
  },
};

export async function postImage(id, file) {
  try {
    console.log(imgurClientId);
    const fd = new FormData();
    fd.append("image", file);
    const res = await postRequest("3/image", fd, imgurApiUrl, imgurConfig);
    const image = res.data.data.link;
    console.log(image);
    const {
      data: {
        updateGroupChat: { name },
      },
    } = await client.mutate({
      mutation: UPDATE_GROUPCHAT_IMAGE,
      variables: {
        id,
        image,
      },
    });

    return {
      name,
      image,
    };
  } catch (err) {
    console.log(err);
  }
  return false;
}

export default {
  postImage,
};
