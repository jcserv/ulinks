/* eslint-disable react/jsx-boolean-value */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FieldArray, Form, withFormik } from "formik";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import {
  campuses,
  departments,
  letterToTerm,
  numToCampus,
  terms,
  utscLevels,
  years,
} from "../constants";
import { messages } from "../constants/intl/components/CreateChatModal";
import { ChatSchema } from "../constants/YupSchemas";
import { redirect } from "../helpers";
import { capitallize } from "../helpers/formatters";
import { createChat } from "../requests/groupChats";
import { getUserData } from "../requests/permissions";
import CourseInfo from "./CourseInfo";
import LinkFields from "./LinkFields";

const ChatForm = ({
  errors,
  setFieldValue,
  values: { name, description, links, isCommunity, courseInfo },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = name || description || links || isCommunity;
  const { formatMessage } = useIntl();

  // UTSG, UTM, UTSC
  const inferCampus = (val) => {
    const campus = val.toUpperCase();
    if (campuses.includes(campus)) {
      setFieldValue("courseInfo.campus", campus);
    }
  };

  // CSC
  const inferDepartment = (val) => {
    const dept = val.toUpperCase();
    if (departments.includes(dept)) {
      setFieldValue("courseInfo.department", dept);
    }
  };

  // CSC108
  const inferCode = (val) => {
    if (val.length === 6) {
      const code = val.slice(3);
      const numCode = parseInt(code, 10);
      const endNums = parseInt(code[1] + code[2], 10);
      if (numCode >= 100 && numCode <= 499) {
        setFieldValue("courseInfo.code", code);
      } else if (
        utscLevels.includes(code[0]) &&
        endNums >= 0 &&
        endNums <= 99
      ) {
        setFieldValue("courseInfo.code", code);
        setFieldValue("courseInfo.campus", "UTSC");
      }
    }
  };

  // CSC108H5F
  const inferFullCode = (val) => {
    if (val.length === 9) {
      // don't need to do course code since that's covered by inferCode
      const term = letterToTerm[val[8]];
      const campus = numToCampus[val[7]];
      if (term) setFieldValue("courseInfo.term", term);
      if (campus) setFieldValue("courseInfo.campus", campus);
    }
  };

  // Fall, Winter, Summer, Year
  const inferTerm = (val) => {
    if (!val) return;
    const term = capitallize(val);
    if (terms.includes(term)) {
      setFieldValue("courseInfo.term", term);
    }
  };

  const inferYear = (val) => {
    const yearMatches = years.filter((x) => x.split("-")[0] === val);
    if (yearMatches.length === 1)
      setFieldValue("courseInfo.year", yearMatches[0]);
  };

  return (
    <Form className="col-6 w-100">
      <FormControl id="name" isInvalid={hasSubmitted && errors.name}>
        <FormLabel>{formatMessage(messages.name)}</FormLabel>
        <Input
          type="text"
          onChange={(e) => {
            setFieldValue("name", e.target.value);
            const words = e.target.value.split(" ");
            words.forEach((word) => {
              if (word.length >= 3) {
                inferDepartment(word);
                inferCode(word);
                inferCampus(word);
                inferTerm(word);
                inferYear(word);
                inferFullCode(word);
              }
            });
          }}
        />
        {!isCommunity && (
          <FormHelperText>{formatMessage(messages.gcNameTip)}</FormHelperText>
        )}
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
          <LinkFields
            errors={errors}
            hasSubmitted={hasSubmitted}
            links={links}
            setFieldValue={setFieldValue}
          />
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
    { props: { onClose, redirectToChat, toast } }
  ) => {
    const email = cookie.get("email");
    const data = await getUserData(email);
    const userStatus = data.getUser.status;
    const groupChat = await createChat(
      email,
      name,
      isCommunity,
      userStatus,
      description,
      links,
      courseInfo
    );
    if (groupChat) {
      const { name: groupChatName, id } = groupChat;
      toast({
        title: "Success",
        description: `${
          isCommunity && data.getUser.status !== "admin"
            ? "Request has been submitted"
            : `${groupChatName} has been created`
        }`,
        status: "success",
        position: "bottom-left",
        duration: 5000,
        isCloseable: false,
      });
      onClose();
      redirectToChat(id);
    } else {
      toast({
        title: "Error",
        description: "An error has occurred, please try again.",
        status: "error",
        position: "bottom-left",
        duration: 5000,
        isCloseable: false,
      });
      onClose();
    }
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
  const { formatMessage } = useIntl();
  const toast = useToast();
  const { locale, defaultLocale, push } = useRouter();

  const redirectToChat = (id) => {
    redirect(`/chat/${id}`, push, locale, defaultLocale);
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formatMessage(messages.submitGroupChat)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EnhancedChatForm
            onClose={onClose}
            redirectToChat={redirectToChat}
            toast={toast}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
