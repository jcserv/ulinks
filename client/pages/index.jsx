import { gql } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillGridFill, BsPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import AdvancedSearchModal from "../components/AdvancedSearchModal";
import { Card } from "../components/Card";
import TabSelect from "../components/TabSelect";
import locales from "../content/locale";

const messages = defineMessages({
  discover: {
    id: "discover",
    description: locales.en.discover,
    defaultMessage: locales.en.discover,
  },
  findGroupchats: {
    id: "find-groupchats",
    description: locales.en["find-groupchats"],
    defaultMessage: locales.en["find-groupchats"],
  },
  all: {
    id: "all",
    description: locales.en.all,
    defaultMessage: locales.en.all,
  },
  courses: {
    id: "courses",
    description: locales.en.courses,
    defaultMessage: locales.en.courses,
  },
  communities: {
    id: "communities",
    description: locales.en.communities,
    defaultMessage: locales.en.communities,
  },
});

export default function Home({
  groupChats: { groupChats, totalPages, pageNumber },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formatMessage } = useIntl();
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [totalPageState, setTotalPage] = useState(totalPages);
  const [groupChatStates, setGroupChats] = useState(groupChats);
  const [isCommunity, setCommunity] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [oldSearchQuery, setOldSearchQuery] = useState("");

  const tabs = [
    {
      label: formatMessage(messages.all),
      icon: BsFillGridFill,
    },
    {
      label: formatMessage(messages.courses),
      icon: FaBook,
    },
    {
      label: formatMessage(messages.communities),
      icon: BsPeopleFill,
    },
  ];

  function applyGroupChatFilter() {
    if (isCommunity === 0) {
      return groupChatStates;
    }
    if (isCommunity === 1) {
      return groupChatStates.filter((groupChat) => !groupChat.isCommunity);
    }
    return groupChatStates.filter((groupChat) => groupChat.isCommunity);
  }

  const filteredGroupChats = applyGroupChatFilter();

  const handleSearch = async () => {
    setCurrentPage(0);
    setOldSearchQuery(searchQuery);
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: gql`
        query searchGroupChats($text: String, $isCommunity: Boolean) {
          groupChats: searchGroupChats(text: $text, isCommunity: $isCommunity) {
            groupChats {
              name
              description
              links
              id
            }
            totalPages
            pageNumber
          }
        }
      `,
      variables: {
        text: searchQuery,
        isCommunity: isCommunity === 2,
      },
    });
    setGroupChats([...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };

  const displayMorePages = async () => {
    setCurrentPage((page) => page + 1);
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: gql`
        query searchGroupChats(
          $page: Float
          $text: String
          $isCommunity: Boolean
        ) {
          groupChats: searchGroupChats(
            page: $page
            text: $text
            isCommunity: $isCommunity
          ) {
            groupChats {
              name
              description
              links
              id
            }
            totalPages
            pageNumber
          }
        }
      `,
      variables: {
        page: currentPage + 1,
        text: oldSearchQuery,
        isCommunity: isCommunity === 2,
      },
    });
    setGroupChats((oldGroupChats) => [...oldGroupChats, ...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };
  return (
    <div className="page-container">
      <div
        className="col-8 align-items-center justify-self-center m-4"
        name="discover"
      >
        <Text fontSize="md" color="grey" m={3}>
          {formatMessage(messages.findGroupchats)}
        </Text>
        <div className="d-flex row-12 justify-content-between">
          <Heading as="h1" size="2xl" m={3}>
            {formatMessage(messages.discover)}
          </Heading>
          <TabSelect tabs={tabs} onChange={setCommunity} />
          <br />
        </div>
      </div>
      <div className="col-8">
        <InputGroup>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            mb={4}
          />
          <InputRightElement pr={10}>
            <ButtonGroup isAttached>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={handleSearch}
              />
              <IconButton
                aria-label="Advanced search settings"
                icon={<GoSettings />}
                onClick={onOpen}
              />
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
        <Flex wrap="wrap" justifyContent="flex-start">
          {filteredGroupChats.map((groupChat, index) => (
            <Card key={index} {...groupChat} />
          ))}
        </Flex>
        {currentPage !== totalPageState ? (
          <Box textAlign="center">
            <Button onClick={displayMorePages}>View More</Button>
          </Box>
        ) : null}
        <AdvancedSearchModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setGroupChats={setGroupChats}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const {
    data: { groupChats },
  } = await client.query({
    query: gql`
      query getGroupChats {
        groupChats: getGroupChats {
          groupChats {
            name
            description
            links
            id
            isCommunity
          }
          totalPages
          pageNumber
        }
      }
    `,
  });
  return {
    props: {
      groupChats,
    },
  };
}
