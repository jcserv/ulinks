import {
  Icon,
  Link,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaDev, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";

import { colors } from "../theme";

const icons = {
  discord: FaDiscord,
  github: VscGithubInverted,
  devpost: FaDev,
  whatsapp: FaWhatsapp,
};

const LinkIcon = ({
  index,
  boxSize,
  color,
  onHoverColor,
  url,
  label,
  icon,
}) => (
  <Tooltip label={label} aria-label={`${label}-tooltip`} key={`link-${index}`}>
    <Link
      aria-label={`Open link to ${url}`}
      display="inline-block"
      href={url}
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

const LinkIconBar = ({
  links,
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
