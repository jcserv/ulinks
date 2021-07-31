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
  useToast,
} from "@chakra-ui/react";
import cookie from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import { useIntl } from "react-intl";
import Sticky from "react-stickynode";

import { messages } from "../constants/intl/components/NavBar";
import { getUserData } from "../requests/permissions";
import { colors } from "../theme";
import CreateChatModal from "./CreateChatModal";

const Logo = ({ locale }) => (
  <Heading
    as={Link}
    href="/"
    m={4}
    size="lg"
    style={{ textDecoration: "none" }}
  >
    <NextLink href="/" locale={locale}>
      ULinks
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
  const [navBtns, setNavBtns] = useState([]);

  const navBtnsAll = [
    {
      label: formatMessage(messages.create),
      href: "Create",
    },
    {
      label: formatMessage(messages.admin),
      href: "/admin",
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

  const statusToNavBtnIndex = {
    admin: 2,
    user: 1,
  };

  const email = cookie.get("email");

  useEffect(async () => {
    if (!email) {
      setNavBtns(navBtnsAll.slice(2));
      return;
    }
    const data = await getUserData(email);
    setNavBtns(navBtnsAll.slice(0, statusToNavBtnIndex[data?.getUser.status]));
  }, [email, locale]);

  const btns = navBtns.map((btn) => (
    <Button key={btn.label} size={size} variant="link" mb={2} onClick={onClose}>
      {btn.href === "Create" ? ( // forgive me father for this is jank
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

const ColorModeButton = () => {
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
      />
    </Tooltip>
  );
};

const LocaleSelect = ({ mr }) => {
  const { formatMessage } = useIntl();

  return (
    <Menu>
      <Tooltip
        label={formatMessage(messages.languages)}
        aria-label={formatMessage(messages.languages)}
      >
        <MenuButton
          title="language-btn"
          as={IconButton}
          icon={<FaGlobe />}
          size="md"
          variant="ghost"
          style={{ marginRight: mr }}
        />
      </Tooltip>
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
};

const Settings = ({ mr }) => {
  const { locale } = useRouter();
  const { formatMessage } = useIntl();
  const toast = useToast();

  const logout = async () => {
    cookie.remove("email");
    return toast({
      title: "Success",
      description: "Successfully logged out",
      status: "success",
      position: "bottom-left",
      duration: 5000,
      isCloseable: false,
    });
  };

  if (typeof cookie.get("email") !== "undefined") {
    return (
      <Menu>
        <Tooltip
          label={formatMessage(messages.settings)}
          aria-label={formatMessage(messages.settings)}
        >
          <MenuButton
            title="settings-btn"
            as={IconButton}
            icon={<BsGearFill />}
            size="lg"
            variant="ghost"
            style={{ marginRight: mr }}
          />
        </Tooltip>
        <MenuList size="sm">
          <NextLink href="/" locale={locale}>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    );
  }
  return null;
};

const MenuLinks = ({ locale, onModalOpen, onClose }) => {
  const [localeMargin, setLocaleMargin] = useState("15px");
  const email = cookie.get("email");

  useEffect(() => {
    setLocaleMargin(typeof email === "undefined" ? "15px" : "0px");
  }, [email]);

  return (
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
      <ColorModeButton />
      <LocaleSelect mr={localeMargin} />
      <Settings mr="15px" />
    </Stack>
  );
};

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
            <ColorModeButton />
            <LocaleSelect />
            <Settings />
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
