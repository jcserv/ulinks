/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, withFormik } from "formik";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import { departments } from "../constants";
import { ChatSchema } from "../constants/YupSchemas";
import locales from "../content/locale";
import { UPDATE_GROUPCHAT } from "../gql/GroupChat";
import CourseInfo from "./CourseInfo";

const messages = defineMessages({
  name: {
    id: "name",
    description: locales.en.name,
    defaultMessage: locales.en.name,
  },
  description: {
    id: "description",
    description: locales.en.description,
    defaultMessage: locales.en.description,
  },
  link: {
    id: "link",
    description: locales.en.link,
    defaultMessage: locales.en.link,
  },
  type: {
    id: "type",
    description: locales.en.type,
    defaultMessage: locales.en.type,
  },
  addLink: {
    id: "add-link",
    description: locales.en["add-link"],
    defaultMessage: locales.en["add-link"],
  },
  removeLink: {
    id: "remove-link",
    description: locales.en["remove-link"],
    defaultMessage: locales.en["remove-link"],
  },
  submit: {
    id: "submit",
    description: locales.en.submit,
    defaultMessage: locales.en.submit,
  },
  campus: {
    id: "campus",
    description: locales.en.campus,
    defaultMessage: locales.en.campus,
  },
  department: {
    id: "department",
    description: locales.en.department,
    defaultMessage: locales.en.department,
  },
  code: {
    id: "code",
    description: locales.en.code,
    defaultMessage: locales.en.code,
  },
  term: {
    id: "term",
    description: locales.en.term,
    defaultMessage: locales.en.term,
  },
  year: {
    id: "year",
    description: locales.en.year,
    defaultMessage: locales.en.year,
  },
  course: {
    id: "course",
    description: locales.en.course,
    defaultMessage: locales.en.course,
  },
  community: {
    id: "community",
    description: locales.en.community,
    defaultMessage: locales.en.community,
  },
});

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, courseInfo, isCommunity },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = name || description || links || isCommunity;
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6 w-100">
      <FormControl id="name" isInvalid={hasSubmitted && errors.name}>
        <FormLabel>{formatMessage(messages.name)}</FormLabel>
        <Input
          value={name}
          type="text"
          onChange={(e) => {
            setFieldValue("name", e.target.value);
            if (
              e.target.value.length === 6 &&
              departments.includes(e.target.value.slice(0, 3).toUpperCase()) &&
              parseInt(e.target.value.slice(3), 10) >= 100 &&
              parseInt(e.target.value.slice(3), 10) <= 499
            ) {
              setFieldValue(
                "courseInfo.department",
                name.slice(0, 3).toUpperCase()
              );
              setFieldValue("courseInfo.code", e.target.value.slice(3));
            }
          }}
        />
        {hasSubmitted && <Text color="red">{errors.name}</Text>}
      </FormControl>
      <FormControl
        id="description"
        mt={2}
        isInvalid={hasSubmitted && errors.description}
      >
        <FormLabel>{formatMessage(messages.description)}</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.description}</Text>}
      </FormControl>
      {!isCommunity && (
        <CourseInfo
          errors={errors}
          setFieldValue={setFieldValue}
          hasSubmitted={hasSubmitted}
          values={courseInfo}
          prependCourseInfo
        />
      )}
      <FieldArray
        name="links"
        render={() => (
          <div>
            {links.map((link, index) => (
              <FormControl
                name={`links.${index}`}
                key={index}
                mt={2}
                isInvalid={hasSubmitted && errors.links}
              >
                <FormLabel>{formatMessage(messages.link)}</FormLabel>
                <Input
                  as={Field}
                  name={`links.${index}`}
                  type="text"
                  value={link}
                />
                {hasSubmitted && <Text color="red">{errors.links}</Text>}
              </FormControl>
            ))}
            <HStack>
              <Button
                colorScheme="blue"
                disabled={links.length >= 2}
                rightIcon={<AddIcon />}
                className="w-50 mt-4"
                onClick={() => {
                  if (links.length < 2) setFieldValue("links", [...links, ""]);
                }}
              >
                {formatMessage(messages.addLink)}
              </Button>
              <Button
                colorScheme="red"
                disabled={links.length <= 1}
                rightIcon={<DeleteIcon />}
                className="w-50 mt-4"
                onClick={() => {
                  if (links.length > 1)
                    setFieldValue("links", [
                      ...links.slice(0, links.length - 1),
                    ]);
                }}
              >
                {formatMessage(messages.removeLink)}
              </Button>
            </HStack>
          </div>
        )}
      />
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="green"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.submit)}
      </Button>
    </Form>
  );
};

const EnhancedChatForm = withFormik({
  enableReinitialize: true,
  handleSubmit: async (
    {
      // eslint-disable-next-line prettier/prettier
      name,
      description,
      status,
      links,
      isCommunity,
      courseInfo,
      id,
    },
    { props: { onClose, setChatInfo, toast } }
  ) => {
    if (courseInfo.__typename != undefined) {
      delete courseInfo.__typename;
    }
    const {
      data: {
        groupChat: {
          id: groupChatId,
          name: groupChatName,
          description: groupChatDesc,
          links: groupChatLinks,
          isCommunity: groupChatIsCommunity,
          image: groupChatImage,
          status: groupChatStatus,
          courseInformation: groupChatCourseInfo,
        },
      },
    } = await client.mutate({
      mutation: UPDATE_GROUPCHAT,
      variables: {
        id,
        chatInfo: {
          name,
          status,
          description,
          isCommunity,
          links,
          ...(!isCommunity ? { courseInformation: courseInfo } : {}),
        },
      },
    });
    toast({
      title: "Success",
      description: `${groupChatName} info has been changed`,
      status: "success",
      position: "bottom-left",
      duration: 5000,
      isCloseable: false,
    });
    setChatInfo({
      id: groupChatId,
      name: groupChatName,
      description: groupChatDesc,
      links: groupChatLinks,
      isCommunity: groupChatIsCommunity,
      image: groupChatImage,
      status: groupChatStatus,
      courseInformation: groupChatCourseInfo,
    });
    onClose();
  },
  mapPropsToValues: ({ initialVals, id }) => ({
    id,
    name: initialVals.name,
    description: initialVals.description,
    links: initialVals.links,
    status: initialVals.status,
    isCommunity: initialVals.isCommunity,
    courseInfo: !initialVals.isCommunity ? initialVals.courseInformation : {},
  }),
  validationSchema: () => ChatSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(ChatForm);

export default function EditChatModal({
  isOpen,
  onClose,
  initialVals,
  id,
  setChatInfo,
}) {
  const toast = useToast();
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EnhancedChatForm
            onClose={onClose}
            toast={toast}
            initialVals={initialVals}
            id={id}
            setChatInfo={setChatInfo}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
