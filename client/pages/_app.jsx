import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { IntlProvider } from "react-intl";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import locales from "../content/locale";
import theme from "../theme";

const TITLE = "uoft.connectu | Find all your school communities in one place";
const DESCRIPTION = "Find all your school communities in one place";
const URL = "http://uoft.connectu.tech";

const SiteHead = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="title" content={TITLE} />
    <meta name="description" content={DESCRIPTION} />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={URL} />
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:image" content="/logo.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={URL} />
    <meta property="twitter:title" content={TITLE} />
    <meta property="twitter:description" content={DESCRIPTION} />
    <meta property="twitter:image" content="/logo.png" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossOrigin="anonymous"
    />
  </Head>
);

const PageWrapper = ({ children, title }) => (
  <div>
    <SiteHead title={title} />
    <NavBar />
    <main className="main">{children}</main>
    <Footer />
  </div>
);

function App({ Component, pageProps }) {
  const { locale, defaultLocale, pathname } = useRouter();

  const pathToTitle = {
    "/": TITLE,
    "/admin": "Admin Panel | ConnectU",
    "/login": "Sign in to ConnectU | ConnectU",
    "/register": "Join ConnectU | ConnectU",
    "/team": "Learn about the team | ConnectU",
  };

  const messages = locales[locale];

  return (
    <ChakraProvider theme={theme}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <PageWrapper title={pathToTitle[pathname]}>
          <Component {...pageProps} />
        </PageWrapper>
      </IntlProvider>
    </ChakraProvider>
  );
}

export default App;
