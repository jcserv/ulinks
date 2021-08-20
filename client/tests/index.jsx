/* eslint-disable import/no-extraneous-dependencies */
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import React from "react";
import { IntlProvider } from "react-intl";

import locales from "../content/locale";

const mockRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

export const wrapInIntl = (component) => (
  <IntlProvider locale="en" defaultLocale="en" messages={locales.en}>
    {component}
  </IntlProvider>
);

export const wrapInRouter = (component) => (
  <RouterContext.Provider value={{ ...mockRouter }}>
    {component}
  </RouterContext.Provider>
);

export const wrapInTheme = (component) => (
  <ChakraProvider>{component}</ChakraProvider>
);

export const renderWrapped = (component) =>
  render(wrapInRouter(wrapInTheme(wrapInIntl(component))));

export default {
  wrapInIntl,
};
