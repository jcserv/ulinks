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

  const [curSearchQuery, setSearchQuery] = useState(q ?? "");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageState, setTotalPage] = useState(0);
  const [groupChatStates, setGroupChats] = useState([]);
  const [curIsCommunity, setCommunity] = useState(0);

  const search = async (searchQuery, isCommunity = 0, page = 0) => {
    const {
      data: {
        groupChats: {
          groupChats: newGroupChats,
          totalPages: newTotalPages,
          pageNumber: newPageNumber,
        },
      },
    } = await client.query({
      query: isCommunity === 0 ? SEARCH_ALL_GROUPCHATS : SEARCH_GROUPCHATS,
      variables: {
        page,
        ...(searchQuery === "" ? {} : { text: searchQuery }),
        ...(isCommunity === 0 ? { isCommunity: isCommunity === 2 } : {}),
      },
    });
    return {
      groupChats: newGroupChats,
      totalPages: newTotalPages,
      pageNumber: newPageNumber,
    };
  };

  useEffect(async () => {
    const { groupChats, totalPages, pageNumber } = await search();
    setGroupChats([...groupChats]);
    setTotalPage(totalPages);
    setCurrentPage(pageNumber);
  }, []);

  useEffect(async () => {
    const { groupChats, totalPages, pageNumber } = await search(q, iscommunity);
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

  function applyGroupChatFilter(groupchatstates) {
    if (curIsCommunity === 0) {
      return groupchatstates;
    }
    if (curIsCommunity === 1) {
      return groupchatstates.filter((groupChat) => !groupChat.isCommunity);
    }
    return groupchatstates.filter((groupChat) => groupChat.isCommunity);
  }

  const handleSearch = async () => {
    setCurrentPage(0);
    if (curIsCommunity === 0) {
      push(
        `${locale !== defaultLocale ? locale : ""}/?q=${curSearchQuery}`,
        undefined,
        { shallow: true }
      );
    } else {
      push(
        `${
          locale !== defaultLocale ? locale : ""
        }/?q=${curSearchQuery}&iscommunity=${curIsCommunity === 1}`,
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
    } = await search(curSearchQuery, curIsCommunity, currentPage + 1);
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
        <div className="d-flex row-12">
          <Heading as="h1" size="2xl" m={3}>
            {formatMessage(messages.discover)}
          </Heading>
          <br />
        </div>
        <div className="d-flex row-12">
          <TabSelect tabs={tabs} onChange={setCommunity} />
        </div>
      </div>
      <div className="col-8">
        <InputGroup>
          <Input
            placeholder="Search"
            value={curSearchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            mb={4}
          />
          <InputRightElement pr={curIsCommunity !== 2 ? 10 : 0}>
            <ButtonGroup isAttached>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={handleSearch}
              />
              {curIsCommunity !== 2 && (
                <IconButton
                  aria-label="Advanced search settings"
                  icon={<GoSettings />}
                  onClick={onOpen}
                />
              )}
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
        <Flex wrap="wrap" justifyContent="flex-start">
          {applyGroupChatFilter(groupChatStates).map((groupChat, index) => (
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
