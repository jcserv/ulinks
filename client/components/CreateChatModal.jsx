/* eslint-disable react/jsx-boolean-value */
import { gql } from "@apollo/client";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, withFormik } from "formik";
import cookie from "js-cookie";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import client from "../apollo-client";
import locales from "../content/locale";
import { campuses, departments, terms, years } from "../data/constants";

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

const ChatSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required(),
  description: Yup.string().min(3).max(200).required(),
  links: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .required()
    .test({
      name: "Includes Discord/WhatsApp",
      message: "Link must be from Discord or WhatsApp",
      test: (value) =>
        value.every(
          (val) =>
            (val && val.includes("discord")) ||
            (val && val.includes("whatsapp"))
        ),
    }),
  isCommunity: Yup.boolean().required(),
  courseInfo: Yup.object().when("isCommunity", {
    is: false,
    then: Yup.object()
      .shape({
        campus: Yup.string().oneOf(campuses).required("Campus is required"),
        department: Yup.string()
          .oneOf(departments)
          .required("Department is required"),
        code: Yup.string().required("Code is required"),
        term: Yup.string().oneOf(terms).required("Term is required"),
        year: Yup.string().required("Year is required"),
      })
      .required(),
    otherwise: Yup.object(),
  }),
});

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, isCommunity, courseInfo },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = name || description || links || isCommunity;
  const { formatMessage } = useIntl();

  return (
    <Form className="col-6 w-100">
      <FormControl id="name" isInvalid={hasSubmitted && errors.name}>
        <FormLabel>{formatMessage(messages.name)}</FormLabel>
        <Input
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
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.description}</Text>}
      </FormControl>
      <FormControl id="type" mt={2} isInvalid={hasSubmitted && errors.type}>
        <FormLabel>{formatMessage(messages.type)}</FormLabel>
        <RadioGroup
          onChange={(val) => setFieldValue("isCommunity", val === "true")}
          value={isCommunity}
        >
          <Stack direction="row">
            <Radio id="course" value={false}>
              {formatMessage(messages.course)}
            </Radio>
            <Radio id="community" value={true}>
              {formatMessage(messages.community)}
            </Radio>
          </Stack>
        </RadioGroup>
        {hasSubmitted && <Text color="red">{errors.isCommunity}</Text>}
      </FormControl>
      {!isCommunity && (
        <>
          <FormControl
            id="campus"
            isInvalid={
              hasSubmitted && errors.courseInfo && errors.courseInfo.campus
            }
            mt={2}
          >
            <FormLabel>{formatMessage(messages.campus)}</FormLabel>
            <Select
              placeholder="Select campus"
              onChange={(e) => {
                setFieldValue("courseInfo.campus", e.target.value);
              }}
            >
              {campuses.map((campus, index) => (
                <option key={index} value={campus}>
                  {campus}
                </option>
              ))}
            </Select>
            {hasSubmitted && (
              <Text color="red">
                {errors.courseInfo && errors.courseInfo.campus}
              </Text>
            )}
          </FormControl>
          <div className="d-flex row-12 justify-content-center">
            <FormControl
              w="50%"
              id="department"
              isInvalid={
                hasSubmitted &&
                errors.courseInfo &&
                errors.courseInfo.department
              }
              mt={2}
              mr={2}
            >
              <FormLabel>{formatMessage(messages.department)}</FormLabel>
              <Select
                placeholder="Select department"
                onChange={(e) => {
                  setFieldValue("courseInfo.department", e.target.value);
                }}
                value={courseInfo && courseInfo.department}
              >
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </Select>
              {hasSubmitted && (
                <Text color="red">
                  {errors.courseInfo && errors.courseInfo.department}
                </Text>
              )}
            </FormControl>
            <FormControl
              w="50%"
              id="code"
              isInvalid={
                hasSubmitted && errors.courseInfo && errors.courseInfo.code
              }
              mt={2}
            >
              <FormLabel>{formatMessage(messages.code)}</FormLabel>
              <NumberInput
                min={100}
                max={499}
                value={courseInfo.code}
                onChange={(val) => setFieldValue("courseInfo.code", val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {hasSubmitted && (
                <Text color="red">
                  {errors.courseInfo && errors.courseInfo.code}
                </Text>
              )}
            </FormControl>
          </div>
          <div className="d-flex row-12 justify-content-center">
            <FormControl
              w="50%"
              id="term"
              isInvalid={
                hasSubmitted && errors.courseInfo && errors.courseInfo.term
              }
              mt={2}
              mr={2}
            >
              <FormLabel>{formatMessage(messages.term)}</FormLabel>
              <Select
                placeholder="Select term"
                onChange={(e) => {
                  setFieldValue("courseInfo.term", e.target.value);
                }}
              >
                {terms.map((term, index) => (
                  <option key={index} value={term}>
                    {term}
                  </option>
                ))}
              </Select>
              {hasSubmitted && (
                <Text color="red">
                  {errors.courseInfo && errors.courseInfo.term}
                </Text>
              )}
            </FormControl>
            <FormControl
              w="50%"
              id="year"
              isInvalid={
                hasSubmitted && errors.courseInfo && errors.courseInfo.year
              }
              mt={2}
            >
              <FormLabel>{formatMessage(messages.year)}</FormLabel>
              <Select
                placeholder="Select year"
                onChange={(e) => {
                  setFieldValue("courseInfo.year", e.target.value);
                }}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              {hasSubmitted && (
                <Text color="red">
                  {errors.courseInfo && errors.courseInfo.year}
                </Text>
              )}
            </FormControl>
          </div>
        </>
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
      links,
      isCommunity,
      courseInfo,
    },
    { props: { onClose, toast } }
  ) => {
    const email = cookie.get("email");
    const {
      data: {
        groupChat: { name: groupChatName },
      },
    } = await client.mutate({
      mutation: gql`
        mutation addGroupChat($email: String!, $info: createGroupChatInput!) {
          groupChat: addGroupChat(email: $email, info: $info) {
            name
          }
        }
      `,
      variables: {
        email,
        info: {
          name,
          status: isCommunity ? "pending" : "approved",
          description,
          links,
          isCommunity,
          ...(!isCommunity ? { courseInformation: courseInfo } : {}),
        },
      },
    });
    toast({
      title: "Success",
      description: `${
        isCommunity
          ? "Request has been submitted"
          : `${groupChatName} has been created`
      }`,
      status: "success",
      position: "bottom-left",
      duration: 5000,
      isCloseable: false,
    });
    onClose();
  },
  mapPropsToValues: () => ({
    name: "",
    description: "",
    links: [""],
    isCommunity: false,
    courseInfo: {
      campus: "",
      department: "",
      code: "101",
      term: "",
      year: "2021",
    },
  }),
  validationSchema: () => ChatSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(ChatForm);

export default function CreateChatModal({ isOpen, onClose }) {
  const toast = useToast();

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit a Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EnhancedChatForm onClose={onClose} toast={toast} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
