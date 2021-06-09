import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const UserCard = ({ email }) => (
  <Box
    borderRadius="lg"
    borderWidth="1px"
    rounded="md"
    shadow="lg"
    className="d-flex row-6"
    mb={4}
  >
    <Heading as="h2" size="md" m={6}>
      {email}
    </Heading>
  </Box>
);

const UsersList = ({ heading, noItemsText, items }) => (
  <div className="col-12 m-5">
    <div className="row-12">
      <Heading as="h2" size="md" mb={2} color="gray.500">
        {heading}
      </Heading>
    </div>
    <div className="row-12">
      {items &&
        items.map((chat, index) => (
          <UserCard key={index} heading={heading} {...chat} />
        ))}
      {items.length === 0 && <Text>{noItemsText}</Text>}
    </div>
  </div>
);

export default UsersList;
