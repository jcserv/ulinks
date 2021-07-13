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
        title={`${chat.name} | ConnectU`}
        description={`Join group chats for ${chat.name}`}
      />
      <ChatInfo {...chatInfo} id={id} setChatInfo={setChatInfo} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const {
    data: { getGroupChat },
  } = await client.query({
    query: GET_GROUPCHAT,
    variables: { id },
  });
  return {
    props: {
      chat: getGroupChat,
      id,
    },
  };
}
