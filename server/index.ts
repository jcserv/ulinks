import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { AuthChecker, buildSchema } from "type-graphql";
import mongoose from "mongoose";
import "dotenv/config";
import jwt, { secretType } from "express-jwt";

import {
  AuthenticationResolver,
  UserResolver,
  GroupChatResolver,
} from "./resolvers";

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const customAuthChecker: AuthChecker<any> = ({ context: { req } }, roles) => {
  if (!req.user) {
    return false;
  }
  return roles.some((role) => role === req.user.status);
};

const path = "/graphql";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [AuthenticationResolver, UserResolver, GroupChatResolver],
    authChecker: customAuthChecker
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const app = Express();

  app.use(
    path,
    jwt({
      secret: process.env.SECRET as secretType,
      credentialsRequired: false,
      algorithms: ["HS256"],
    })
  );

  apolloServer.applyMiddleware({ app, path });

  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Server started on http://localhost:${process.env.PORT || 4000}/graphql`
    );
  });
};

main();
