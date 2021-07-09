import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

import { contributors, links } from "../constants/footerLinks";
import { formatAsList } from "../helpers/formatters";
import Emoji from "./Emoji";
import LinkIconBar from "./LinkIconBar";

export default function Footer() {
  return (
    <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
      <Text fontSize="sm">
        Made with <Emoji label="blue heart" symbol="&#128153;" />
        {" by  "}
        {contributors.map((contributor, index) => (
          <Link key={contributor.name} href={contributor.href} isExternal>
            {formatAsList(contributor.name, index, contributors)}
          </Link>
        ))}
      </Text>
      <LinkIconBar links={links} />
    </Box>
  );
}
