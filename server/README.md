# 🚀 ulinks server

Primary maintainer for backend:

- [@AipioxTechson](https://github.com/AipioxTechson)

## 💼 Local Development

For server, you'll need this .env file:

```
PORT=4000
MONGO_URI=[put your mongo URI here]
SECRET=[secret hash for encryption]
NODEMAILER_EMAIL=[admin@ulinks.io, for us]
NODEMAILER_PASSWORD=[password for ethereal email]
CLIENT_ID=[google api client id]
CLIENT_SECRET=[accompanying secret]
REFRESH_TOKEN=[token generated from oauth 2.0 playground]
```

```

You can create a testing email with: https://ethereal.email/create

## 📋 Backend Acceptance Criteria:

1. It should be properly linted/formatted (`yarn run format`)
2. Adequate automated test coverage
3. Basic manual QA

## ⛏️ Built With

- Typescript
- [GraphQL](https://graphql.org/)
- Node.js
- Express
```
