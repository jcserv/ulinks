# 🚀 ulinks

ULinks is a platform for students to browse & upload academic group chats to stay connected during online school.
It is an open source project, built with accessibility and i18n in mind, allowing any schools to spin up their own instance with little to no modification. 
Ulinks was originally started at TOHacks 2021, <a href="https://devpost.com/software/connectu-q2cm8o">Devpost here</a>.

## 📁 Project Structure

```text
.
├── client
│   ├── components     
│   ├── constants
│   ├── content                     # Language jsons
│   ├── gql                         # GraphQL Queries
│   ├── helpers
│   ├── pages
│   ├── requests                    # Apollo query/mutate functions
│   ├── styles
│   ├── tests                      
│   └──  theme
├── server
└── README.md                       # You are here! :)
```

## 💡 Contributing

ULinks follows Gitflow. We practice CI/CD where we continuously deploy off of main and use develop for feature work/integration.

```
──────────────────────── main ────────────────────────────────────    # Deployments
        │                                   │
        └───────────── develop ─────────────                          # Development work
            │                           │
            └───────── feat/[feat-name] ───                             # Feature branches
```

Dev branches should be appended with an indicator to describe the type of work being done, including but not limited to:
feat, hot-fix, refactor, tweak, docs, chore

For internal team:
1. Clone the repo
2. See featurework

For open source contributors:
1. Fork the repo
2. `git remote add upstream https://github.com/jcserv/ulinks/`
3. `git fetch upstream`
4. `git rebase upstream/develop`
5. See featurework

Frontend Acceptance Criteria:
1. It should be properly linted/formatted (`yarn run format`)
2. Adequate automated test coverage (WIP)
3. Basic manual QA & accessibility checks with Axe

## ⛏️ Featurework:

1. `git checkout -b feat/[feat-name]`
2. Write your code
3. Open a PR from that branch to develop (in the main repo)
4. Fill out the pull request template accordingly
5. To be approved, code must have adequate test coverage + formatted properly
6. Commits should be squashed when merged

## 💼 Local Development

### Running Locally 

For client & server, you'll need a .env file in each.

client:
```
HOST=http://localhost:4000
```

server:
```
PORT=4000
MONGO_URI=[put your mongo URI here]
SECRET=[secret hash for encryption]
MAILGUN_API_KEY=[]
```

Locally running:
1. `yarn`               # install husky for pre-commit hooks
2. `cd client && yarn`
3. `yarn dev`
4. `cd server && yarn`
5. `yarn dev`

### With Docker 🐳

With Docker:
1. Download Docker
2. Copy/create the .env for server into the root directory
3. `docker compose up --build`

Go to http://localhost:3000 for the frontend, and http://localhost:4000/graphql for the graphql backend

## 💫 Deployment

Client: Import your Github project into Vercel. It will now have automated deployments on push.

Server: We opted to use Google Cloud Run, which can be set to auto deploy on pushes to main.

## ⛏️ Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [GraphQL](https://graphql.org/)

## ✍️ Contributors <a name = "authors"></a>
- [@AipioxTechson](https://github.com/AipioxTechson)
- [@jcserv](https://jarrodservilla.com)
- [@CometWhoosh](https://github.com/CometWhoosh)
- [@imphungky](https://github.com/imphungky) 
- [@jordanburr](https://github.com/jordanburr22)
- [@ninaricci29](https://github.com/ninaricci29)
- [@nandomancini](https://github.com/NandoMancini)
- [@DigestedLime](https://github.com/DigestedLime) - 🇫🇷 translation support <3

# 🔗 Relevant Links

- [Website](https://ulinks.io)
- [Original Frontend Repo](https://github.com/AipioxTechson/connectu-fe)
- [Original Backend Repo](https://github.com/AipioxTechson/connectu-be)
- [Devpost](https://devpost.com/software/connectu-q2cm8o)

## 🏁 License

Distributed under the MIT License. See `LICENSE` for more information.
