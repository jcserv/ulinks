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
import { useIntl } from "react-intl";

import { RegisterSchema, USER_EXISTS } from "../constants";
import { messages } from "../content/messages/components/RegisterForm";
import { register } from "../requests";
import Email from "./Email";

const RegisterForm = ({
  errors,
  setFieldValue,
  values: { email, password, confirmPassword },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { formatMessage } = useIntl();
  const width = useBreakpointValue({ base: "w-50", sm: "w-50", md: "w-25" });
  const isValid = email && password && confirmPassword;
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
        isInvalid={hasSubmitted && errors.confirmPassword}
      >
        <FormLabel>{formatMessage(messages.password)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.password}</Text>}
      </FormControl>
      <FormControl
        id="confirmPassword"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.confirmPassword}
      >
        <FormLabel>{formatMessage(messages.confirmPassword)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.confirmPassword}</Text>}
      </FormControl>
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="green"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.createAcct)}
      </Button>
    </Form>
  );
};

export const EnhancedRegisterForm = withFormik({
  enableReinitialize: true,
  handleSubmit: async (
    { email, password },
    { props: { redirectToHomepage, toast } }
  ) => {
    const { status, jwtToken } = await register(email, password);

    if (status === "USER_EXISTS") {
      toast(USER_EXISTS);
    } else {
      cookie.set("email", email, 24);
      cookie.set("authToken", jwtToken, 24);
      redirectToHomepage();
    }
  },
  mapPropsToValues: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema: () => RegisterSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(RegisterForm);

export default EnhancedRegisterForm;
