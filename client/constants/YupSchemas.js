import * as Yup from "yup";

import { campuses, departments, terms } from "./config";

export const CourseInfoSchema = Yup.object().shape({
  campus: Yup.string().oneOf(campuses).required("Campus is required"),
  department: Yup.string()
    .oneOf(departments)
    .required("Department is required"),
  code: Yup.string().required("Code is required"),
  term: Yup.string().oneOf(terms).required("Term is required"),
  year: Yup.string().required("Year is required"),
});

export const ChatSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required(),
  description: Yup.string().min(3).max(500).required(),
  links: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .required()
    .test({
      name: "Includes Discord, WhatsApp, Slack, or Linktree",
      message: "Link must be from Discord, Linktree, or WhatsApp",
      test: (value) =>
        value.every(
          (val) =>
            (val && val.includes("discord")) ||
            (val && val.includes("whatsapp")) ||
            (val && val.includes("linktr.ee")) ||
            (val && val.includes("slack"))
        ),
    }),
  isCommunity: Yup.boolean().required(),
  courseInfo: Yup.object().when("isCommunity", {
    is: false,
    then: CourseInfoSchema.required(),
    otherwise: Yup.object(),
  }),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(
      /(^[A-Za-z0-9._%+-]+@mail.utoronto.ca$|^[A-Za-z0-9._%+-]+@utoronto.ca$)/,
      "Email does not end with valid domain"
    )
    .required(),
  password: Yup.string().required(),
});

export const RegisterSchema = Yup.object().shape({
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

export default {
  ChatSchema,
  CourseInfoSchema,
  LoginSchema,
  RegisterSchema,
};
