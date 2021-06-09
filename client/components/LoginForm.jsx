import { gql } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import cookie from "js-cookie";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import client from "../apollo-client";
import locales from "../content/locale";

const messages = defineMessages({
  createAcct: {
    id: "create-acct",
    description: locales.en["create-acct"],
    defaultMessage: locales.en.test,
  },
  emailAddress: {
    id: "email-address",
    description: locales.en["email-address"],
    defaultMessage: locales.en["email-address"],
  },
  password: {
    id: "password",
    description: locales.en.password,
    defaultMessage: locales.en.password,
  },
  login: {
    id: "login",
    description: locales.en.login,
    defaultMessage: locales.en.login,
  },
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(
      /(^[A-Za-z0-9._%+-]+@mail.utoronto.ca$|^[A-Za-z0-9._%+-]+@utoronto.ca$)/,
      "Email does not end with valid domain"
    )
    .required(),
  password: Yup.string().required(),
});

const LoginForm = ({ errors, setFieldValue }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6 w-25">
      <FormControl
        id="email"
        isRequired
        isInvalid={hasSubmitted && errors.email}
      >
        <FormLabel>{formatMessage(messages.emailAddress)}</FormLabel>
        <Input
          type="email"
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.email}</Text>}
      </FormControl>
      <FormControl
        id="password"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.password}
      >
        <FormLabel>{formatMessage(messages.password)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.password}</Text>}
      </FormControl>
      <Button
        className="w-100 mt-4"
        colorScheme="green"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.login)}
      </Button>
    </Form>
  );
};

export const EnhancedLoginForm = withFormik({
  enableReinitialize: true,
  handleSubmit: async (
    { email, password },
    { props: { redirectToHomepage, toast } }
  ) => {
    const {
      data: {
        login: { status, jwtToken },
      },
    } = await client.query({
      query: gql`
        query login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            status
            jwtToken
          }
        }
      `,
      variables: { email, password },
    });
    if (status === "OK") {
      cookie.set("email", email, 24);
      cookie.set("authToken", jwtToken, 24);
      redirectToHomepage();
    } else {
      toast({
        title: "Login unsuccessful",
        description: "Please try again.",
        status: "error",
        position: "bottom-left",
        duration: 9000,
        isClosable: true,
      });
    }
  },
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: () => LoginSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(LoginForm);

export default EnhancedLoginForm;
