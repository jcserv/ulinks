import { Box, Center, Icon, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  FaDiscord,
  FaRegSnowflake,
  FaSun,
  FaTree,
  FaWhatsapp,
} from "react-icons/fa";
import { GiChestnutLeaf } from "react-icons/gi";
import Tilt from "react-vanilla-tilt";

const termToIcon = {
  Fall: GiChestnutLeaf,
  Winter: FaRegSnowflake,
  Summer: FaSun,
};

const LinkIcon = ({ link, titleColor }) => (
  <>
    {link.includes("discord") && (
      <FaDiscord color={titleColor} style={{ marginRight: "5px" }} />
    )}
    {link.includes("chat.whatsapp.com") && (
      <FaWhatsapp color={titleColor} style={{ marginRight: "5px" }} />
    )}
    {link.includes("linktr.ee") && (
      <FaTree color={titleColor} style={{ marginRight: "5px" }} />
    )}
  </>
);

const CourseInfo = ({ descriptionColor, campus, term, year }) => (
  <>
    <Box
      mt="1"
      color={descriptionColor}
      fontWeight="semibold"
      as="h2"
      isTruncated
    >
      {campus} <Icon as={termToIcon[term]} /> {year}
    </Box>
  </>
);

export const Card = ({
  name,
  image,
  links,
  id,
  isCommunity,
  courseInformation,
}) => {
  const { locale, defaultLocale, push } = useRouter();
  const backgroundColor = useColorModeValue("#FFFFFF", "#181a1b");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const titleColor = useColorModeValue("black", "white");

  const cardStyle = {
    background: backgroundColor,
    width: "300px",
    padding: "30px",
    margin: "10px",
    borderRadius: "4px; color: rgb(54, 73, 98)",
    fontSize: "16px; line-height: 1.6",
    cursor: "pointer",
  };

  return (
    <Tilt
      onClick={() => {
        push(`${locale !== defaultLocale ? locale : ""}/chat/${id}`);
      }}
      style={cardStyle}
    >
      <Box
        bg={backgroundColor}
        maxW="sm"
        minHeight="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Center>
          <Image
            src={image}
            placeholder="/logo.png"
            width="250"
            height="200"
            alt="CourseImage"
          />
        </Center>

        <Box p="6">
          <Box
            fontWeight="semibold"
            as="h2"
            lineHeight="tight"
            color={titleColor}
          >
            {name}
          </Box>
          {!isCommunity && (
            <CourseInfo
              descriptionColor={descriptionColor}
              {...courseInformation}
            />
          )}
          <Box className="d-flex" mt="2">
            {links.map((link, index) => (
              <LinkIcon key={index} color={titleColor} link={link} />
            ))}
          </Box>
        </Box>
      </Box>
    </Tilt>
  );
};

export default Card;
