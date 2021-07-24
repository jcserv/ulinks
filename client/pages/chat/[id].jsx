import { NextSeo } from "next-seo";
import React, { useState } from "react";

import ChatInfo from "../../components/ChatInfo";
import { getGroupchatReq } from "../../requests/groupChats";

export default function Chat({ chat, id }) {
  const [chatInfo, setChatInfo] = useState(chat);
  return (
    <div className="page-container">
      <NextSeo
        title={`${chat.name} | ULinks`}
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
    const getGroupChat = await getGroupchatReq(id);
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
