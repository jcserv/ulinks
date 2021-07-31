import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { FaDiscord, FaSlack, FaTree, FaWhatsapp } from "react-icons/fa";
import { useIntl } from "react-intl";

import { MAX_NUM_LINKS, MIN_NUM_LINKS, supportedLinks } from "../constants";
import { messages } from "../constants/intl/components/CreateChatModal";

const QuickAddButtons = ({ index, links, formatMessage, setFieldValue }) => {
  const onQuickAdd = (url) => {
    const newLinks = [...links];
    newLinks[index] = url;
    setFieldValue("links", newLinks);
  };

  const buttons = [
    {
      name: "Discord",
      icon: FaDiscord,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
    },
    {
      name: "Slack",
      icon: FaSlack,
    },
    {
      name: "Linktree",
      icon: FaTree,
    },
  ];

  return (
    <HStack>
      <FormLabel>{formatMessage(messages.link)}</FormLabel>
      <Spacer />
      {buttons.map((btn) => (
        <IconButton
          aria-label={`Prefill ${btn.name} link`}
          boxSize="1.5em"
          icon={<btn.icon />}
          variant="ghost"
          onClick={() => onQuickAdd(supportedLinks[btn.name.toLowerCase()])}
        />
      ))}
    </HStack>
  );
};

const LinkFields = ({ errors, hasSubmitted, links, setFieldValue }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      {links.map((link, index) => (
        <FormControl
          name={`links.${index}`}
          key={index}
          mt={2}
          isInvalid={hasSubmitted && errors.links}
        >
          <QuickAddButtons
            index={index}
            links={links}
            formatMessage={formatMessage}
            setFieldValue={setFieldValue}
          />
          <Input as={Field} name={`links.${index}`} type="text" value={link} />
          {hasSubmitted && <Text color="red">{errors.links}</Text>}
        </FormControl>
      ))}
      <HStack>
        <Button
          colorScheme="blue"
          disabled={links.length >= MAX_NUM_LINKS}
          rightIcon={<AddIcon />}
          className="w-50 mt-4"
          onClick={() => {
            if (links.length < MAX_NUM_LINKS)
              setFieldValue("links", [...links, ""]);
          }}
        >
          {formatMessage(messages.addLink)}
        </Button>
        <Button
          colorScheme="red"
          disabled={links.length <= MIN_NUM_LINKS}
          rightIcon={<DeleteIcon />}
          className="w-50 mt-4"
          onClick={() => {
            if (links.length > MIN_NUM_LINKS)
              setFieldValue("links", [...links.slice(0, links.length - 1)]);
          }}
        >
          {formatMessage(messages.removeLink)}
        </Button>
      </HStack>
    </div>
  );
};

export default LinkFields;
