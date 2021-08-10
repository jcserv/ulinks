"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const express_jwt_1 = __importDefault(require("express-jwt"));
const database_1 = require("./database");
const email_1 = require("./helpers/email");
const resolvers_1 = require("./resolvers");
mongoose_1.default.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const customAuthChecker = ({ context: { req } }, roles) => {
    if (!req.user) {
        return false;
    }
    return roles.some((role) => role === req.user.status);
};
const path = "/graphql";
// TO DO: figure out how to allow vercel preview apps
const allowedOrigins = ["http://localhost:3000", "https://www.ulinks.io/"];
const main = async () => {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [resolvers_1.AuthenticationResolver, resolvers_1.UserResolver, resolvers_1.GroupChatResolver],
        authChecker: customAuthChecker,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });
    const app = express_1.default();
    app.set("view engine", "ejs");
    app.use(cors_1.default({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = "The CORS policy for this site does not allow access from the specified domain";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    }));
    app.use(path, express_jwt_1.default({
        secret: process.env.SECRET,
        credentialsRequired: false,
        algorithms: ["HS256"],
    }));
    app.use(express_1.default.static("public"));
    // Verification
    app.get("/verify/:hashId", async function (req, res) {
        const { hashId } = req.params;
        const user = await database_1.User.findOne({ verifyHash: hashId });
        if (!user) {
            res.sendStatus(404);
            return;
        }
        if (user.verifyHash == hashId && !user.verified) {
            user.verified = true;
            await user.save();
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    });
    // Resend verification email
    app.get("/resend/:email", async function (req, res) {
        const { email } = req.params;
        const user = await database_1.User.findOne({ email });
        if (!user) {
            res.sendStatus(404);
            return;
        }
        try {
            await email_1.sendEmail(email, await email_1.emailTypeToContent("confirmEmail", user.verifyHash));
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
        return;
    });
    apolloServer.applyMiddleware({ app, path });
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server started on http://localhost:${process.env.PORT || 4000}/graphql`);
    });
};
main();
//# sourceMappingURL=index.js.map