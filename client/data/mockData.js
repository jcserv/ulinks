import { createMockGroupChat, createMockUser } from "../helpers";

const mockGroupChats = [
  createMockGroupChat({
    name: "CSC301",
    description: "Introduction to Software Engineering",
    isCommunity: false,
    links: ["http://discord.gg/420", "http://whatsapp.com/1"],
    status: "pending",
    courseInfo: {
      campus: "UTM",
      department: "CSC",
      courseCode: "301",
      term: "fall",
      year: 2021,
    },
  }),
  createMockGroupChat({
    name: "CSC148",
    description: "Introduction to Computer Science",
    isCommunity: false,
    links: ["http://discord.gg/420"],
    status: "pending",
    courseInfo: {
      campus: "UTM",
      department: "CSC",
      code: "148",
      term: "fall",
      year: 2021,
    },
  }),
  createMockGroupChat({
    name: "White Van",
    description: "we vibing",
    isCommunity: true,
    links: ["http://discord.gg/420"],
    status: "approved",
    courseInfo: {},
  }),
];

export const mockUsers = [
  createMockUser({
    email: "john.doe@utoronto.ca",
    password: "DSAOIJFSAIOFJ",
    groupChats: [],
    status: "banned",
  }),
  createMockUser({
    email: "jane.doe@mail.utoronto.ca",
    password: "DSAOIJFSAIOFJ",
    groupChats: [],
    status: "banned",
  }),
  createMockUser({
    email: "jamal.crawford@utoronto.ca",
    password: "DSAOIJFSAIOFJ",
    groupChats: [],
    status: "banned",
  }),
];

export default mockGroupChats;
