FROM node:14-alpine
ENV PORT 3000
WORKDIR /client
# install app dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn
# add app
COPY . ./
# start app
EXPOSE 3000
CMD "yarn" "dev"