import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import cookie from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import { defineMessages, useIntl } from "react-intl";
import Sticky from "react-stickynode";

import locales from "../content/locale";
import { colors } from "../theme";
import CreateChatModal from "./CreateChatModal";

const messages = defineMessages({
  admin: {
    id: "admin",
    description: locales.en.admin,
    defaultMessage: locales.en.admin,
  },
  create: {
    id: "create",
    description: locales.en.create,
    defaultMessage: locales.en.create,
  },
  login: {
    id: "login",
    description: locales.en.login,
    defaultMessage: locales.en.login,
  },
  register: {
    id: "register",
    description: locales.en.register,
    defaultMessage: locales.en.register,
  },
  toggleLightMode: {
    id: "toggle-light-mode",
    description: locales.en["toggle-light-mode"],
    defaultMessage: locales.en["toggle-light-mode"],
  },
  toggleDarkMode: {
    id: "toggle-dark-mode",
    description: locales.en["toggle-dark-mode"],
    defaultMessage: locales.en["toggle-dark-mode"],
  },
});

const Logo = ({ locale }) => (
  <Heading as={Link} href="/" m={4} size="lg">
    <NextLink href="/" locale={locale}>
      ConnectU
    </NextLink>
  </Heading>
);

const MenuToggle = ({ isOpen, onOpen }) => (
  <Box display={{ base: "block", md: "none" }} pr={4}>
    <Button onClick={onOpen}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Button>
  </Box>
);

const NavButtons = ({ locale, onModalOpen, size, onClose }) => {
  const { formatMessage } = useIntl();

  const navBtns = [
    {
      label: formatMessage(messages.create),
    },
    {
      label: formatMessage(messages.login),
      href: "/login",
    },
    {
      label: formatMessage(messages.register),
      href: "/register",
    },
  ];

  const displayBtns =
    cookie.get("email") !== undefined ? navBtns.slice(0, 1) : navBtns.slice(1);
  const btns = displayBtns.map((btn) => (
    <Button key={btn.label} size={size} variant="link" mb={2} onClick={onClose}>
      {btn.label === "Create" ? (
        <Button variant="link" onClick={onModalOpen}>
          {btn.label}
        </Button>
      ) : (
        <Link href={btn.href}>
          <NextLink href={btn.href} locale={locale}>
            {btn.label}
          </NextLink>
        </Link>
      )}
    </Button>
  ));
  return <>{btns}</>;
};

const ColorModeButton = ({ mr }) => {
  const { toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue("dark", "light");
  const label = formatMessage(
    nextMode === "dark" ? messages.toggleDarkMode : messages.toggleLightMode
  );
  return (
    <Tooltip label={label} aria-label={label}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={label}
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        style={{ marginRight: mr }}
      />
    </Tooltip>
  );
};

const LocaleSelect = () => (
  <Menu>
    <MenuButton
      title="language-btn"
      as={IconButton}
      icon={<FaGlobe />}
      size="md"
      variant="ghost"
    />
    <MenuList size="sm">
      <NextLink href="/" locale="en">
        <MenuItem>English</MenuItem>
      </NextLink>
      <NextLink href="/" locale="fr">
        <MenuItem>French</MenuItem>
      </NextLink>
    </MenuList>
  </Menu>
);

const MenuLinks = ({ locale, onModalOpen, onClose }) => (
  <Stack
    display={{ base: "none", sm: "none", md: "block" }}
    width={{ sm: "full", md: "auto" }}
    spacing="24px"
    direction={["column", "row", "row", "row"]}
    alignItems="center"
  >
    <NavButtons
      locale={locale}
      size="sm"
      onModalOpen={onModalOpen}
      onClose={onClose}
    />
    <LocaleSelect />
    <ColorModeButton mr="12px" />
  </Stack>
);

const NavMenu = ({ locale, isOpen, onModalOpen, onClose }) => (
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerBody>
          <Stack
            alignItems="center"
            justifyContent="center"
            direction={["column"]}
            spacing="24px"
            mt="20vh"
          >
            <NavButtons
              locale={locale}
              size="lg"
              onModalOpen={onModalOpen}
              onClose={onClose}
            />
            <LocaleSelect />
            <ColorModeButton />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

export default function Navbar() {
  const primary = useColorModeValue(colors.primary.light, colors.primary.dark);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const { locale } = useRouter();
  return (
    <Sticky enabled innerZ={99}>
      <Stack
        as="header"
        w="100%"
        direction={["row", "row", "row", "row"]}
        alignItems="center"
        justifyContent="center"
        bg={primary}
      >
        <Logo locale={locale} />
        <Spacer />
        <MenuLinks
          locale={locale}
          onModalOpen={onModalOpen}
          onClose={onClose}
        />
        <NavMenu
          locale={locale}
          isOpen={isOpen}
          onModalOpen={onModalOpen}
          onClose={onClose}
        />
        <MenuToggle isOpen={isOpen} onOpen={onOpen} />
      </Stack>
      <CreateChatModal
        isOpen={isModalOpen}
        onOpen={onModalOpen}
        onClose={onModalClose}
      />
    </Sticky>
  );
}
