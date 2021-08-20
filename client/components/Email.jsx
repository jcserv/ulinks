import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { acceptedEmailDomains } from "../constants";
import { messages } from "../content/messages/components/RegisterForm";

export const Email = ({
  email,
  errors,
  formatMessage,
  hasSubmitted,
  setFieldValue,
}) => (
  <FormControl id="email" isRequired isInvalid={hasSubmitted && errors.email}>
    <FormLabel>{formatMessage(messages.emailAddress)}</FormLabel>
    <Input
      list="emailSuggestions"
      type="email"
      onChange={(e) => setFieldValue("email", e.target.value)}
    />
    {email.length > 0 && // render datalist only if user has inputted + it doesn't already end with accepted domain(s)
      !acceptedEmailDomains.some((domain) => email.endsWith(domain)) && (
        <datalist id="emailSuggestions" style={{ width: "100%" }}>
          {acceptedEmailDomains.map((domain) => (
            <option value={`${email}${domain}`}>{`${email}${domain}`}</option>
          ))}
        </datalist>
      )}
    <FormHelperText>{formatMessage(messages.emailHelperText)}</FormHelperText>
    {hasSubmitted && <Text color="red">{errors.email}</Text>}
  </FormControl>
);

export default Email;
