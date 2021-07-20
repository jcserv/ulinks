import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import client from "../apollo-client";
import { messages } from "../constants/intl/components/AdvancedSearchModal";
import { ADVANCED_SEARCH_GROUPCHATS } from "../gql/GroupChat";
import CourseInfo from "./CourseInfo";

const SearchForm = ({
  errors,
  setFieldValue,
  values: { campus, department, code, term, year },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = campus || department || code || term || year;
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6 w-100">
      <CourseInfo
        errors={errors}
        setFieldValue={setFieldValue}
        hasSubmitted={hasSubmitted}
        values={{ campus, department, code, term, year }}
      />
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="teal"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.submit)}
      </Button>
    </Form>
  );
};

const EnhancedSearchForm = withFormik({
  enableReinitialize: true,
  handleSubmit: async (
    // eslint-disable-next-line prettier/prettier
    { campus, department, code, term, year },
    { props: { onClose, setGroupChats, toast } }
  ) => {
    const {
      data: {
        groupChats: { groupChats: newGroupChats },
      },
    } = await client.query({
      query: ADVANCED_SEARCH_GROUPCHATS,
      variables: {
        campus,
        department,
        code,
        term,
        year,
      },
    });
    if (newGroupChats.length === 0) {
      toast({
        title: "Error",
        description: "No results returned, please try again.",
        status: "error",
        position: "bottom-left",
        duration: 5000,
        isCloseable: false,
      });
    } else {
      setGroupChats(newGroupChats);
      toast({
        title: "Success",
        description: "Search results returned",
        status: "success",
        position: "bottom-left",
        duration: 5000,
        isCloseable: false,
      });
    }
    onClose();
  },
  mapPropsToValues: () => ({
    campus: "",
    department: "",
    code: "",
    term: "",
    year: "",
  }),
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(SearchForm);

export default function AdvancedSearchModal({
  isOpen,
  onClose,
  setGroupChats,
}) {
  const { formatMessage } = useIntl();
  const toast = useToast();
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formatMessage(messages.advancedSearch)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EnhancedSearchForm
            onClose={onClose}
            setGroupChats={setGroupChats}
            toast={toast}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
