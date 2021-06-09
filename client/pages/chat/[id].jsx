import { gql } from "@apollo/client";
import { NextSeo } from "next-seo";
import React from "react";

import client from "../../apollo-client";
import ChatInfo from "../../components/ChatInfo";
import { localesArr } from "../../content/locale";

export default function Chat({ chat }) {
  return (
    <div className="page-container">
      <NextSeo
        title={`${chat.name} | ConnectU`}
        description={`Join group chats for ${chat.name}`}
      />
      <ChatInfo {...chat} />
    </div>
  );
}

export async function getStaticPaths() {
  const {
    data: {
      getAllGroupChatIds: { groupChats },
    },
  } = await client.query({
    query: gql`
      query getAllGroupChatIds {
        getAllGroupChatIds {
          groupChats
        }
      }
    `,
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
    query: gql`
      query getGroupChat($id: String!) {
        getGroupChat(id: $id) {
          name
          description
          links
        }
      }
    `,
    variables: { id },
  });
  return {
    props: {
      chat: getGroupChat,
    },
  };
}
