// next.config.js
module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "fr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    domains: ["i.imgur.com", "cssc.utm.utoronto.ca"],
  },
  env: {
    HOST: process.env.HOST,
  },
};
