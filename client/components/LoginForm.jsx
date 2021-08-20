import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import cookie from "js-cookie";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";

import { LOGIN_FAILURE, LoginSchema } from "../constants";
import locales from "../content/locale";
import { login } from "../requests";
import Email from "./Email";

const messages = defineMessages({
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

const LoginForm = ({ errors, setFieldValue, values: { email } }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { formatMessage } = useIntl();
  const width = useBreakpointValue({ base: "w-50", sm: "w-50", md: "w-25" });
  return (
    <Form className={`col-6 ${width}`}>
      <Email
        email={email}
        hasSubmitted={hasSubmitted}
        errors={errors}
        formatMessage={formatMessage}
        setFieldValue={setFieldValue}
      />
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
    const { status, jwtToken } = await login(email, password);
    if (status === "OK") {
      cookie.set("email", email, 24);
      cookie.set("authToken", jwtToken, 24);
      redirectToHomepage();
    } else {
      toast(LOGIN_FAILURE);
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
