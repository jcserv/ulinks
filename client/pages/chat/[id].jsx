import { NextSeo } from "next-seo";
import React, { useState } from "react";

import client from "../../apollo-client";
import ChatInfo from "../../components/ChatInfo";
import { GET_GROUPCHAT } from "../../gql/GroupChat";

export default function Chat({ chat, id }) {
  const [chatInfo, setChatInfo] = useState(chat);
  return (
    <div className="page-container">
      <NextSeo
        title={`${chat.name} | ulinks`}
        description={`Join group chats for ${chat.name}`}
      />
      <ChatInfo {...chatInfo} id={id} setChatInfo={setChatInfo} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id.length !== 24) {
    return {
      notFound: true,
    };
  }
  try {
    const {
      data: { getGroupChat },
    } = await client.query({
      query: GET_GROUPCHAT,
      variables: { id },
    });

    if (!getGroupChat) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        chat: getGroupChat,
        id,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
