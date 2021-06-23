import { gql } from "@apollo/client";
import cookie from "js-cookie";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";

import client from "../../apollo-client";
import ChatInfo from "../../components/ChatInfo";
import { localesArr } from "../../content/locale";
import { GET_GROUPCHAT, GET_GROUPCHAT_IDS } from "../../gql/GroupChat";
import { GET_USER } from "../../gql/User";

export default function Chat({ chat, id }) {
  const [editPermissions, setEditPermissions] = useState(false);
  useEffect(async () => {
    const email = cookie.get("email");
    if (email) {
      const { data } = await client.query({
        query: GET_USER,
        variables: {
          email,
        },
      });
      if (!data.getUser) {
        return;
      }
      if (
        data.getUser.status === "admin" ||
        data.getUser.groupChatsCreated.includes(id)
      ) {
        setEditPermissions(true);
      }
    }
  }, []);

  return (
    <div className="page-container">
      <NextSeo
        title={`${chat.name} | ConnectU`}
        description={`Join group chats for ${chat.name}`}
      />
      <ChatInfo {...chat} editPermissions={editPermissions} id={id} />
    </div>
  );
}

export async function getStaticPaths() {
  const {
    data: {
      getAllGroupChatIds: { groupChats },
    },
  } = await client.query({
    query: GET_GROUPCHAT_IDS,
  });
  const paths =
    groupChats.length > 0 &&
    groupChats
      .map((chat) =>
        localesArr.map((locale) => ({
          params: { id: chat },
          locale,
        }))
      )
      .flat();

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
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
