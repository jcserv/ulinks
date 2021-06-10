FROM node:14-alpine

ENV PORT 4000
ENV SECRET qlwmwqmqojpompon1p2pj4p12ojgwenwoiqi
ENV MONGO_URI mongodb+srv://admin:RTt1OqQJXGl6xL18@cluster0.1x9xf.mongodb.net/connectu?retryWrites=true&w=majority

# create root application folder
WORKDIR /server

# copy source code to folder
COPY ./ ./

RUN yarn

EXPOSE 4000

CMD [ "yarn", "dev"]