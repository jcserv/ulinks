import {
  Icon,
  Link,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaDev, FaDiscord, FaSlack, FaTree, FaWhatsapp } from "react-icons/fa";
import { VscGithubInverted, VscIssues } from "react-icons/vsc";

import { colors } from "../theme";

const icons = {
  bug: VscIssues,
  devpost: FaDev,
  discord: FaDiscord,
  github: VscGithubInverted,
  linktree: FaTree,
  slack: FaSlack,
  whatsapp: FaWhatsapp,
};

const LinkIcon = ({
  index,
  url,
  label,
  icon,
  sideEffect,
  boxSize,
  color,
  onHoverColor,
}) => (
  <Tooltip label={label} aria-label={`${label}-tooltip`} key={`link-${index}`}>
    <Link
      aria-label={`Open link to ${url}`}
      data-testid={label}
      display="inline-block"
      href={url}
      onClick={sideEffect}
      isExternal
    >
      <Icon
        as={icons[icon]}
        boxSize={boxSize}
        color={color}
        _hover={{ color: onHoverColor }}
      />
    </Link>
  </Tooltip>
);

export const LinkIconBar = ({
  links,
  sideEffect = () => {},
  color,
  onHoverColor,
  boxSize = "1.5em",
  justify = "center",
  ...props
}) => {
  const iconColor =
    color || useColorModeValue(colors.subtle.light, colors.subtle.dark);
  const hoverColor =
    onHoverColor ||
    useColorModeValue(colors.secondary.light, colors.secondary.dark);
  return (
    <Stack
      mt={4}
      direction="row"
      spacing="12px"
      justify={justify}
      mb={10}
      {...props}
    >
      {links &&
        links.map((link, index) => (
          <LinkIcon
            key={link.label}
            index={index}
            sideEffect={sideEffect}
            boxSize={boxSize}
            color={iconColor}
            onHoverColor={hoverColor}
            {...link}
          />
        ))}
    </Stack>
  );
};

export default LinkIconBar;
