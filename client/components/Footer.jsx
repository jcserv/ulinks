import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

import { links } from "../constants/footerLinks";
import Contributors from "./Contributors";
import Emoji from "./Emoji";
import LinkIconBar from "./LinkIconBar";

export default function Footer() {
  return (
    <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
      <HStack justify="center">
        <Text fontSize="sm">
          Made with <Emoji label="blue heart" symbol="&#128153;" /> by
        </Text>
        <Contributors />
      </HStack>
      <LinkIconBar links={links} />
    </Box>
  );
}
