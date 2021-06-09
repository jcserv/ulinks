import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { statuses } from "../data/constants";

const ChatRequestCard = ({ showRequestBtns, modifyRequest, name, id }) => {
  const { locale, defaultLocale, push } = useRouter();
  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      rounded="md"
      shadow="lg"
      className="d-flex row-6 justify-content-center"
      mb={4}
    >
      <Heading as="h2" size="lg" m={6}>
        <Link as={NextLink} href={`/chat/${id}`} locale={locale}>
          {name}
        </Link>
      </Heading>
      <Spacer />
      {showRequestBtns ? (
        <>
          <IconButton
            aria-label="Accept request"
            variant="ghost"
            icon={<CheckIcon />}
            ml={0}
            m={6}
            mr={0}
            onClick={() => modifyRequest(id, statuses.approved)}
          />
          <IconButton
            aria-label="Reject request"
            variant="ghost"
            icon={<CloseIcon />}
            ml={0}
            m={6}
            mr={1}
            onClick={() => modifyRequest(id, statuses.rejected)}
          />
        </>
      ) : (
        <Button
          m={6}
          onClick={() => {
            push(`${locale !== defaultLocale ? locale : ""}/chat/${id}`);
          }}
        >
          Review
        </Button>
      )}
    </Box>
  );
};

const RequestsList = ({
  heading,
  noItemsText,
  showRequestBtns,
  items,
  modifyRequest,
}) => (
  <div className="col-12 m-5">
    <div className="row-12">
      <Heading as="h2" size="md" mb={2} color="gray.500">
        {heading}
      </Heading>
    </div>
    <div className="row-12">
      {items &&
        items.map((chat, index) => (
          <ChatRequestCard
            key={index}
            heading={heading}
            modifyRequest={modifyRequest}
            showRequestBtns={showRequestBtns}
            {...chat}
          />
        ))}
      {items.length === 0 && <Text>{noItemsText}</Text>}
    </div>
  </div>
);

export default RequestsList;
