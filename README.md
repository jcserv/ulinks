# 🚀 ConnectU

[![Codecov Coverage](https://img.shields.io/codecov/c/github/jcserv/connectu/main>.svg?style=flat-square)](https://codecov.io/gh/jcserv/connectu/)

ConnectU is a platform for students to browse & upload academic group chats to stay connected during online school.
It is an open source project, built with accessibility and i18n in mind, allowing any schools to spin up their own instance with little to no modification. 
ConnectU was originally started at TOHacks 2021, <a href="https://devpost.com/software/connectu-q2cm8o">Devpost here</a>.

## 📁 Project Structure

```text
.
├── client
├── server
└── README.md                       # You are here! :)
```

WIP

## 💡 Contributing

ConnectU follows Gitflow. We practice CI/CD where we continuously deploy off of main and use develop for feature work/integration.

```
──────────────────────── main ────────────────────────────────────    # Deployments
        │                                   │
        └───────────── develop ─────────────                          # Development work
            │                           │
            └───────── feature/[name] ───                             # Feature branches
```

For internal team:
1. Clone the repo
2. See featurework

For open source contributors:
1. Fork the repo
2. `git remote add upstream https://github.com/jcserv/connectu/`
3. `git fetch upstream`
4. `git rebase upstream/develop`
5. See featurework

Frontend Acceptance Criteria:
1. It should be properly linted/formatted (`yarn run format`)
2. Adequate automated test coverage (WIP)
3. Basic manual QA & accessibility checks with Axe

## ⛏️ Featurework:

1. `git checkout -b DEV-XXX` (where XXX corresponds to the github issue number)
2. Write your code
3. Open a PR from that branch to develop (in the main repo)
4. Fill out the pull request template accordingly
5. To be approved, code must have adequate test coverage + formatted properly
6. Commits should be squashed when merged

## 💼 Local Development

For client & server, you'll need a .env file in each.

client:
```
HOST=http://localhost:4000
```

server:
```
PORT=4000
MONGO_URI=[put your mongo URI here]
SECRET=[]
```

With Docker:

1. Download Docker
2. Copy the .env for server into the root directory
3. `docker compose up --build`


Locally running:
1. `cd client && yarn`
2. `yarn dev`
3. `cd server && yarn`
4. `yarn dev`

Go to http://localhost:3000 for the frontend, and http://localhost:4000/graphql for the graphql backend

## 💫 Deployment

Import your project into Vercel. It will now have automated deployments on push.

## ⛏️ Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [GraphQL](https://graphql.org/)

## ✍️ Contributors <a name = "authors"></a>
- [@AipioxTechson](https://github.com/AipioxTechson)
- [@jcserv](https://jarrodservilla.com)
- [@imphungky](https://github.com/imphungky)
- [@ninaricci29](https://github.com/ninaricci29)

# 🔗 Relevant Links

- [Website](https://uoftconnectu.tech)
- [Staging Server](https://connectu.vercel.app)
- [Original Frontend Repo](https://github.com/AipioxTechson/connectu-fe)
- [Original Backend Repo](https://github.com/AipioxTechson/connectu-be)
- [Devpost](https://devpost.com/software/connectu-q2cm8o)

## 🏁 License

Distributed under the MIT License. See `LICENSE` for more information.
