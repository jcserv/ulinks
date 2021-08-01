import client from "../apollo-client";
import { INCREMENT_LIKES } from "../gql";

export function incrementLikes(id) {
  client.mutate({
    mutation: INCREMENT_LIKES,
    variables: {
      id,
    },
  });
}

export default {
  incrementLikes,
};
