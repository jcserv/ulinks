import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
};

export const colors = {
  primary: {
    light: "#F7F8FA",
    dark: "#050C17",
  },
  secondary: {
    light: "#6F75FF",
    dark: "#6FFFA6",
  },
  subtle: {
    // used for link icons
    light: "gray.400",
    dark: "#FFFFFF",
  },
  bg: {
    light: "",
    dark: "#343a40",
  },
};

export default extendTheme({
  config,
  colors,
});
