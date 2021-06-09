import { gql } from "@apollo/client";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import client from "../apollo-client";
import locales from "../content/locale";
import { campuses, departments, terms, years } from "../data/constants";

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
});

const SearchSchema = Yup.object().shape({
  campus: Yup.string().oneOf(campuses),
  department: Yup.string().oneOf(departments),
  code: Yup.string(),
  term: Yup.string().oneOf(terms),
  year: Yup.string(),
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
      <FormControl
        id="campus"
        isInvalid={hasSubmitted && errors && errors.campus}
        mt={2}
      >
        <FormLabel htmlFor="campus">{formatMessage(messages.campus)}</FormLabel>
        <Select
          placeholder="Select campus"
          onChange={(e) => {
            setFieldValue("campus", e.target.value);
          }}
        >
          {campuses.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </Select>
        {hasSubmitted && <Text color="red">{errors && errors.campus}</Text>}
      </FormControl>
      <div className="d-flex row-12 justify-content-center">
        <FormControl
          w="50%"
          id="department"
          isInvalid={hasSubmitted && errors && errors.department}
          mt={2}
          mr={2}
        >
          <FormLabel htmlFor="department">
            {formatMessage(messages.department)}
          </FormLabel>
          <Select
            placeholder="Select department"
            onChange={(e) => {
              setFieldValue("department", e.target.value);
            }}
          >
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          {hasSubmitted && (
            <Text color="red">{errors && errors.department}</Text>
          )}
        </FormControl>
        <FormControl
          w="50%"
          id="code"
          isInvalid={hasSubmitted && errors && errors.code}
          mt={2}
        >
          <FormLabel htmlFor="code">{formatMessage(messages.code)}</FormLabel>
          <NumberInput
            min={100}
            max={499}
            value={code}
            onChange={(val) => setFieldValue("code", val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {hasSubmitted && <Text color="red">{errors && errors.code}</Text>}
        </FormControl>
      </div>
      <div className="d-flex row-12 justify-content-center">
        <FormControl
          w="50%"
          id="term"
          isInvalid={hasSubmitted && errors && errors.term}
          mt={2}
          mr={2}
        >
          <FormLabel htmlFor="term">{formatMessage(messages.term)}</FormLabel>
          <Select
            placeholder="Select term"
            onChange={(e) => {
              setFieldValue("term", e.target.value);
            }}
          >
            {terms.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </Select>
          {hasSubmitted && <Text color="red">{errors && errors.term}</Text>}
        </FormControl>
        <FormControl
          w="50%"
          id="year"
          isInvalid={hasSubmitted && errors && errors.year}
          mt={2}
        >
          <FormLabel htmlFor="year">{formatMessage(messages.year)}</FormLabel>
          <Select
            placeholder="Select year"
            onChange={(e) => {
              setFieldValue("year", e.target.value);
            }}
          >
            {years.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </Select>
          {hasSubmitted && <Text color="red">{errors && errors.year}</Text>}
        </FormControl>
      </div>
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
      query: gql`
        query searchGroupChats(
          $campus: String
          $department: String
          $code: String
          $term: String
          $year: String
        ) {
          groupChats: searchGroupChats(
            campus: $campus
            department: $department
            code: $code
            term: $term
            year: $year
          ) {
            groupChats {
              name
              description
              links
              id
            }
          }
        }
      `,
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
  validationSchema: () => SearchSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(SearchForm);

export default function AdvancedSearchModal({
  isOpen,
  onClose,
  setGroupChats,
}) {
  const toast = useToast();

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Advanced Search</ModalHeader>
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
