FROM node:14-alpine

ENV PORT 4000

# create root application folder
WORKDIR /server

# copy source code to folder
COPY ./ ./

RUN yarn

EXPOSE 4000

CMD [ "yarn", "dev"]