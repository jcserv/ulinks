import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import cookie from "js-cookie";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";

import { messages } from "../constants/intl/components/RegisterForm";
import { register } from "../requests/auth";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(
      /(^[A-Za-z0-9._%+-]+@mail.utoronto.ca$|^[A-Za-z0-9._%+-]+@utoronto.ca$)/,
      "Email does not end with valid domain"
    )
    .required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

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
        <FormHelperText>
          {formatMessage(messages.emailHelperText)}
        </FormHelperText>
        {hasSubmitted && <Text color="red">{errors.email}</Text>}
      </FormControl>
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
      toast({
        title: "An error has occurred",
        description: "User already exists",
        position: "bottom-left",
        status: "error",
        duration: 5000,
        isCloseable: false,
      });
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
