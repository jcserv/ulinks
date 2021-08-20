import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Text,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsFillGridFill, BsPeopleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { useIntl } from "react-intl";

import { AdvancedSearchModal, Card, TabSelect } from "../components";
import { messages } from "../content/messages/pages/index";
import { searchChats } from "../requests";

export default function Home() {
  const ml = useBreakpointValue({ base: 35, sm: 150, lg: 135 });
  const [isLargerThan1300, isLargerThan1760] = useMediaQuery([
    "(min-width: 1300px)",
    "(max-width: 1760px)",
  ]);
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

  const [isSearching, setIsSearching] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [curSearchQuery, setSearchQuery] = useState(q ?? "");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageState, setTotalPage] = useState(0);
  const [groupChatStates, setGroupChats] = useState([]);
  const isCommunity = parseIsCommunity(iscommunity);

  const search = async (searchQuery, curIsCommunity = 0, page = 0) => {
    const { newGroupChats, newTotalPages, newPageNumber } = await searchChats(
      searchQuery,
      curIsCommunity,
      page,
      isLargerThan1300 && isLargerThan1760 ? 9 : 8
    );
    return {
      groupChats: newGroupChats,
      totalPages: newTotalPages,
      pageNumber: newPageNumber,
    };
  };

  useEffect(async () => {
    const { groupChats, totalPages, pageNumber } = await search(q, isCommunity);
    setIsSearching(false);
    setGroupChats([...groupChats]);
    setTotalPage(totalPages);
    setCurrentPage(pageNumber);
  }, []);

  useEffect(async () => {
    setIsSearching(true);
    const { groupChats, totalPages, pageNumber } = await search(q, isCommunity);
    setIsSearching(false);
    setGroupChats([...groupChats]);
    setTotalPage(totalPages);
    setCurrentPage(pageNumber);
  }, [q, iscommunity]);

  const observer = useRef();

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
    push(
      `${locale !== defaultLocale ? locale : ""}/?q=${curSearchQuery}`,
      undefined,
      { shallow: true }
    );
  };

  const displayMorePages = async () => {
    setisLoading(true);
    setCurrentPage((page) => page + 1);
    const {
      groupChats: newGroupChats,
      totalPages: newTotalPages,
      pageNumber: newPageNumber,
    } = await search(curSearchQuery, isCommunity, currentPage + 1);
    setGroupChats((oldGroupChats) => [...oldGroupChats, ...newGroupChats]);
    setTotalPage(newTotalPages);
    setCurrentPage(newPageNumber);
    setisLoading(false);
  };
  const handleObserver = (entries) => {
    if (isLoading) return;
    if (entries[0].isIntersecting && currentPage !== totalPageState) {
      displayMorePages();
    }
  };

  const loadAnchor = useCallback((endRef) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    if (endRef) {
      observer.current.observe(endRef);
    }
  });

  const handleCommunityChange = (newIsCommunity) => {
    setCurrentPage(0);
    if (newIsCommunity === 0) {
      push(`${locale !== defaultLocale ? locale : ""}/`, undefined, {
        shallow: true,
      });
    } else {
      push(
        `${locale !== defaultLocale ? locale : ""}/?iscommunity=${
          newIsCommunity === 2
        }`,
        undefined,
        { shallow: true }
      );
    }
    setSearchQuery("");
  };
  return (
    <div className="page-container">
      <div
        className="col-12 col-sm-8 align-items-center justify-self-center m-4"
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
      <div className="col-12 col-sm-8">
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
      {!isSearching ? (
        <>
          {groupChatStates.length === 0 && (
            <Center mt="10vh">
              <Text fontSize="2xl">{formatMessage(messages.noChats)}</Text>
            </Center>
          )}
          <Flex
            wrap="wrap"
            className="col-12 col-sm-9"
            marginLeft={`${ml}px`}
            justifyContent="flex-start"
          >
            {groupChatStates.map((groupChat, index) => (
              <Card key={index} {...groupChat} />
            ))}
          </Flex>
        </>
      ) : (
        <Box padding="6" boxShadow="lg" w="75%">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      )}
      <div ref={loadAnchor} />
      <AdvancedSearchModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setGroupChats={setGroupChats}
      />
    </div>
  );
}
