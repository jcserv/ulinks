import { FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import { campuses, departments, terms, years } from "../constants";
import locales from "../content/locale";

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

const CourseInfo = ({
  errors,
  hasSubmitted,
  setFieldValue,
  prependCourseInfo = false,
  values: { campus, department, code, term, year },
}) => {
  const { formatMessage } = useIntl();

  const fieldValueNameSelector = (field) =>
    `${prependCourseInfo ? "courseInfo." : ""}${field}`;

  return (
    <div>
      <FormControl
        id="campus"
        isInvalid={hasSubmitted && errors && errors.campus}
        mt={2}
      >
        <FormLabel htmlFor="campus">{formatMessage(messages.campus)}</FormLabel>
        <Select
          placeholder={formatMessage(messages.selectCampus)}
          value={campus}
          onChange={(e) => {
            setFieldValue(fieldValueNameSelector("campus"), e.target.value);
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
            placeholder={formatMessage(messages.selectDepartment)}
            value={department}
            onChange={(e) => {
              setFieldValue(
                fieldValueNameSelector("department"),
                e.target.value
              );
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
          <Input
            type="text"
            placeholder="100"
            value={code}
            onChange={(e) => {
              setFieldValue(fieldValueNameSelector("code"), e.target.value);
            }}
          />
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
            placeholder={formatMessage(messages.selectTerm)}
            value={term}
            onChange={(e) => {
              setFieldValue(fieldValueNameSelector("term"), e.target.value);
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
            value={year}
            placeholder={formatMessage(messages.selectYear)}
            onChange={(e) => {
              setFieldValue(fieldValueNameSelector("year"), e.target.value);
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
    </div>
  );
};

export default CourseInfo;
