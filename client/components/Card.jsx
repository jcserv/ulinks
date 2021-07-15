import { Box, Center, Image, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import Tilt from "react-vanilla-tilt";

export const Card = ({ name, description, image, links, id }) => {
  const { locale, defaultLocale, push } = useRouter();
  const backgroundColor = useColorModeValue("#FFFFFF", "#181a1b");
  const textColor = useColorModeValue("black", "white");
  const LinksMapped = links.map((link) => {
    if (link.includes("discord")) {
      return { type: "discord" };
    }
    return { type: "whatsapp" };
  });

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
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Center>
          <Image
            fallbackSrc="/logo.png"
            src={
              image ||
              "https://images.unsplash.com/photo-1415201179613-bd037ff5eb29"
            }
            height="200"
            alt="CourseImage"
          />
        </Center>

        <Box p="6">
          <Box
            fontWeight="semibold"
            as="h2"
            lineHeight="tight"
            color={textColor}
          >
            {name}
          </Box>

          <Box
            mt="1"
            color={textColor}
            fontWeight="semibold"
            as="h2"
            isTruncated
          >
            {description}
          </Box>
          <Box mt="2">
            {LinksMapped.map(({ type }, index) =>
              type === "discord" ? (
                <FaDiscord color={textColor} key={index} />
              ) : (
                <FaWhatsapp color={textColor} key={index} />
              )
            )}
          </Box>
        </Box>
      </Box>
    </Tilt>
  );
};

export default Card;
