"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const express_jwt_1 = __importDefault(require("express-jwt"));
const resolvers_1 = require("./resolvers");
mongoose_1.default.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const customAuthChecker = ({ context: { req } }, roles) => {
    if (!req.user) {
        return false;
    }
    return roles.some((role) => role === req.user.status);
};
const path = "/graphql";
const main = async () => {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [resolvers_1.AuthenticationResolver, resolvers_1.UserResolver, resolvers_1.GroupChatResolver],
        authChecker: customAuthChecker
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });
    const app = express_1.default();
    app.use(path, express_jwt_1.default({
        secret: process.env.SECRET,
        credentialsRequired: false,
        algorithms: ["HS256"],
    }));
    apolloServer.applyMiddleware({ app, path });
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server started on http://localhost:${process.env.PORT || 4000}/graphql`);
    });
};
main();
//# sourceMappingURL=index.js.map