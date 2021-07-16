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
import { defineMessages, useIntl } from "react-intl";

import client from "../apollo-client";
import { CourseInfoSchema } from "../constants/YupSchemas";
import locales from "../content/locale";
import { ADVANCED_SEARCH_GROUPCHATS } from "../gql/GroupChat";
import CourseInfo from "./CourseInfo";

const messages = defineMessages({
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
  advancedSearch: {
    id: "advanced-search",
    description: locales.en["advanced-search"],
    defaultMessage: locales.en["advanced-search"],
  },
  selectCampus: {
    id: "select-campus",
    description: locales.en["select-campus"],
    defaultMessage: locales.en["select-campus"],
  },
  selectDepartment: {
    id: "select-department",
    description: locales.en["select-department"],
    defaultMessage: locales.en["select-department"],
  },
  selectTerm: {
    id: "select-term",
    description: locales.en["select-term"],
    defaultMessage: locales.en["select-term"],
  },
  selectYear: {
    id: "select-year",
    description: locales.en["select-year"],
    defaultMessage: locales.en["select-year"],
  },
});

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
  validationSchema: () => CourseInfoSchema,
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
