import client from "../apollo-client";
import { INCREMENT_LIKES } from "../gql/GroupChat";

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
