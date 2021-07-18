import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillGridFill, BsPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import AdvancedSearchModal from "../components/AdvancedSearchModal";
import { Card } from "../components/Card";
import TabSelect from "../components/TabSelect";
import locales from "../content/locale";
import { SEARCH_ALL_GROUPCHATS, SEARCH_GROUPCHATS } from "../gql/GroupChat";

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
  viewMore: {
    id: "view-more",
    description: locales.en["view-more"],
    defaultMessage: locales.en["view-more"],
  },
  search: {
    id: "search",
    description: locales.en.search,
    defaultMessage: locales.en.search,
  },
  noChats: {
    id: "no-chats",
    description: locales.en["no-chats"],
    defaultMessage: locales.en["no-chats"],
  },
});

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formatMessage } = useIntl();
  const {
    locale,
    defaultLocale,
    push,
    query: { q, iscommunity },
  } = useRouter();

  const parseIsCommunity = (isCommunity) => {
    if (isCommunity !== undefined) {
      if (isCommunity === "false") {
        return 1;
      }
      if (isCommunity === "true") {
        return 2;
      }
    }
    return 0;
  };

  const [curSearchQuery, setSearchQuery] = useState(q ?? "");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageState, setTotalPage] = useState(0);
  const [groupChatStates, setGroupChats] = useState([]);
  const isCommunity = parseIsCommunity(iscommunity);

  const search = async (searchQuery, curIsCommunity = 0, page = 0) => {
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: curIsCommunity === 0 ? SEARCH_ALL_GROUPCHATS : SEARCH_GROUPCHATS,
      variables: {
        page,
        ...(searchQuery === "" ? {} : { text: searchQuery }),
        ...(curIsCommunity !== 0 ? { isCommunity: curIsCommunity === 2 } : {}),
      },
    });
    return {
      groupChats: newGroupChats,
      totalPages: newTotalPages,
      pageNumber: newPageNumber,
    };
  };

  useEffect(async () => {
    const { groupChats, totalPages, pageNumber } = await search(q, isCommunity);
    setGroupChats([...groupChats]);
    setTotalPage(totalPages);
    setCurrentPage(pageNumber);
  }, []);

  useEffect(async () => {
    const { groupChats, totalPages, pageNumber } = await search(q, isCommunity);
    setGroupChats([...groupChats]);
    setTotalPage(totalPages);
    setCurrentPage(pageNumber);
  }, [q, iscommunity]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(0);
    if (isCommunity === 0) {
      push(
        `${locale !== defaultLocale ? locale : ""}/?q=${curSearchQuery}`,
        undefined,
        { shallow: true }
      );
    } else {
      push(
        `${
          locale !== defaultLocale ? locale : ""
        }/?q=${curSearchQuery}&iscommunity=${isCommunity === 2}`,
        undefined,
        { shallow: true }
      );
    }
  };

  const displayMorePages = async () => {
    setCurrentPage((page) => page + 1);
    const {
      groupChats: newGroupChats,
      totalPages: newTotalPages,
      pageNumber: newPageNumber,
    } = await search(curSearchQuery, isCommunity, currentPage + 1);
    setGroupChats((oldGroupChats) => [...oldGroupChats, ...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
  };
  const handleCommunityChange = (newIsCommunity) => {
    setCurrentPage(0);
    if (newIsCommunity === 0) {
      push(
        `${locale !== defaultLocale ? locale : ""}/?q=${curSearchQuery}`,
        undefined,
        { shallow: true }
      );
    } else {
      push(
        `${
          locale !== defaultLocale ? locale : ""
        }/?q=${curSearchQuery}&iscommunity=${newIsCommunity === 2}`,
        undefined,
        { shallow: true }
      );
    }
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
        <div className="d-flex row-12">
          <Heading as="h1" size="2xl" m={3}>
            {formatMessage(messages.discover)}
          </Heading>
          <br />
        </div>
        <div className="d-flex row-12">
          <TabSelect
            tabs={tabs}
            selectedTab={isCommunity}
            onChange={handleCommunityChange}
          />
        </div>
      </div>
      <div className="col-8">
        <form onSubmit={handleSearch}>
          <InputGroup>
            <Input
              placeholder={formatMessage(messages.search)}
              value={curSearchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              mb={4}
            />
            <InputRightElement pr={isCommunity !== 2 ? 10 : 0}>
              <ButtonGroup isAttached>
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  onClick={handleSearch}
                />
                {isCommunity !== 2 && (
                  <IconButton
                    aria-label="Advanced search settings"
                    icon={<GoSettings />}
                    onClick={onOpen}
                  />
                )}
              </ButtonGroup>
            </InputRightElement>
          </InputGroup>
        </form>
      </div>
      {groupChatStates.length === 0 && (
        <Center mt="10vh">
          <Text fontSize="2xl">{formatMessage(messages.noChats)}</Text>
        </Center>
      )}
      <Flex
        wrap="wrap"
        className="col-9"
        marginLeft="100px"
        justifyContent="flex-start"
      >
        {groupChatStates.map((groupChat, index) => (
          <Card key={index} {...groupChat} />
        ))}
      </Flex>
      {currentPage !== totalPageState ? (
        <Box textAlign="center">
          <Button onClick={displayMorePages}>
            {formatMessage(messages.viewMore)}
          </Button>
        </Box>
      ) : null}
      <AdvancedSearchModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setGroupChats={setGroupChats}
      />
    </div>
  );
}
