# Installation

This detailed guide will walk you through all the required dependencies and instructions for running ULinks locally.

Firstly, you will need the following:
- An IDE (we recommend [VSCode](https://code.visualstudio.com/))
- [Node.js](https://nodejs.org/en/)
    - [Yarn](https://yarnpkg.com/getting-started/install) 
- [Git](https://git-scm.com/)

Optional: 
- Docker

1. Fork the repo by clicking on the fork button on the top right
2. After it is done creating, clone your fork.
3. Open this repo with VSCode

Local:

4. Copy .clientenv to client/ and rename it to .env
5. Copy .serverenv to server/ and rename it to .env
    - Reach out to us and we can provide the MONGO_URI for our dev instance
6. While under root, run the following commands to download all dependencies
    - `yarn`               # install husky for pre-commit hooks
    - `cd client && yarn`
    - `yarn dev`
    - `cd server && yarn`
    - `yarn dev`

With Docker 🐳
4. Copy .dockerenv into the root folder
5. Run `docker compose up --build`


=======================================================

Regardless of how you ran it (locally or with docker), the frontend should now be running at http://localhost:3000
and the backend should be running at http://localhost:4000.

To learn how to get started with contributing, check out contributing.md!