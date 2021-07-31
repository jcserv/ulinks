/* eslint-disable react/jsx-boolean-value */
import {
  Button,
  FormControl,
  FormLabel,
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
  useToast,
} from "@chakra-ui/react";
import { FieldArray, Form, withFormik } from "formik";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { messages } from "../constants/intl/components/CreateChatModal";
import { CREATE_CHAT_SUCCESS, GENERIC_ERROR } from "../constants/toasts";
import { ChatSchema } from "../constants/YupSchemas";
import { redirect } from "../helpers";
import { createChat } from "../requests/groupChats";
import { getUserData } from "../requests/permissions";
import CourseInfo from "./CourseInfo";
import LinkFields from "./LinkFields";
import SharedChatFields from "./SharedChatFields";

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
      <SharedChatFields
        errors={errors}
        hasSubmitted={hasSubmitted}
        isCommunity={isCommunity}
        setFieldValue={setFieldValue}
      />
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
      toast(
        CREATE_CHAT_SUCCESS(isCommunity, data.getUser.status, groupChatName)
      );
      onClose();
      redirectToChat(id);
    } else {
      toast(GENERIC_ERROR);
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
