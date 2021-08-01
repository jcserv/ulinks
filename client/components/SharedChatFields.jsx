import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useIntl } from "react-intl";

import {
  campuses,
  departments,
  letterToTerm,
  numToCampus,
  terms,
  utscLevels,
  years,
} from "../constants";
import { messages } from "../content/messages/components/SharedChatFields";
import { capitallize } from "../helpers";

export const SharedChatFields = ({
  errors,
  hasSubmitted,
  isCommunity,
  setFieldValue,
}) => {
  const { formatMessage } = useIntl();

  // UTSG, UTM, UTSC
  const inferCampus = (val) => {
    const campus = val.toUpperCase();
    if (campuses.includes(campus)) {
      setFieldValue("courseInfo.campus", campus);
    }
  };

  // CSC
  const inferDepartment = (val) => {
    const dept = val.toUpperCase();
    if (departments.includes(dept)) {
      setFieldValue("courseInfo.department", dept);
    }
  };

  // CSC108
  const inferCode = (val) => {
    if (val.length === 6) {
      const code = val.slice(3);
      const numCode = parseInt(code, 10);
      const endNums = parseInt(code[1] + code[2], 10);
      if (numCode >= 100 && numCode <= 499) {
        setFieldValue("courseInfo.code", code);
      } else if (
        utscLevels.includes(code[0]) &&
        endNums >= 0 &&
        endNums <= 99
      ) {
        setFieldValue("courseInfo.code", code);
        setFieldValue("courseInfo.campus", "UTSC");
      }
    }
  };

  // CSC108H5F
  const inferFullCode = (val) => {
    if (val.length === 9) {
      // don't need to do course code since that's covered by inferCode
      const term = letterToTerm[val[8]];
      const campus = numToCampus[val[7]];
      if (term) setFieldValue("courseInfo.term", term);
      if (campus) setFieldValue("courseInfo.campus", campus);
    }
  };

  // Fall, Winter, Summer, Year
  const inferTerm = (val) => {
    if (!val) return;
    const term = capitallize(val);
    if (terms.includes(term)) {
      setFieldValue("courseInfo.term", term);
    }
  };

  const inferYear = (val) => {
    const yearMatches = years.filter((x) => x.split("-")[0] === val);
    if (yearMatches.length === 1)
      setFieldValue("courseInfo.year", yearMatches[0]);
  };

  return (
    <div>
      <FormControl id="name" isInvalid={hasSubmitted && errors.name}>
        <FormLabel>{formatMessage(messages.name)}</FormLabel>
        <Input
          type="text"
          onChange={(e) => {
            setFieldValue("name", e.target.value);
            const words = e.target.value.split(" ");
            words.forEach((word) => {
              if (word.length >= 3) {
                inferDepartment(word);
                inferCode(word);
                inferCampus(word);
                inferTerm(word);
                inferYear(word);
                inferFullCode(word);
              }
            });
          }}
        />
        {!isCommunity && (
          <FormHelperText>{formatMessage(messages.gcNameTip)}</FormHelperText>
        )}
        {hasSubmitted && <Text color="red">{errors.name}</Text>}
      </FormControl>
      <FormControl
        id="description"
        mt={2}
        isInvalid={hasSubmitted && errors.description}
      >
        <FormLabel>{formatMessage(messages.description)}</FormLabel>
        <Textarea
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.description}</Text>}
      </FormControl>
    </div>
  );
};

export default SharedChatFields;
