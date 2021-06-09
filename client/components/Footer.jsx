import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

import links from "../data/footerLinks";
import Emoji from "./Emoji";
import LinkIconBar from "./LinkIconBar";

export default function Footer() {
  return (
    <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
      <Text fontSize="sm">
        Made with <Emoji label="blue heart" symbol="&#128153;" />
        {" by "}{" "}
        <Link href="https://github.com/aipioxtechson/" isExternal>
          Ritvik Bhardwaj
        </Link>
        {", "}
        <Link href="https://ca.linkedin.com/in/ninaricci29" isExternal>
          Nina Ricci
        </Link>
        {", and "}
        <Link href="https://linkedin.com/in/jarrod-servilla" isExternal>
          Jarrod Servilla
        </Link>
      </Text>
      <LinkIconBar links={links} />
    </Box>
  );
}
