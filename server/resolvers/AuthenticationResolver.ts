import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { AuthenticationMsg } from "../models";
import { User } from "../database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import { IUser } from "../database/schema";
import { generateRandomString } from "../helpers";
import { emailTypeToContent, sendEmail } from "../helpers/email";

@Resolver()
export class AuthenticationResolver {
  @Authorized("user")
  @Query(() => String, { nullable: true })
  async me(): Promise<string> {
    return "Hello";
  }
  @Query(() => AuthenticationMsg)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthenticationMsg> {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: "NO_USER_FOUND",
      };
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid || user.status === "banned") {
      return {
        status: "INVALID",
      };
    }
    return {
      status: "OK",
      jwtToken: jsonwebtoken.sign(
        { email, status: `${user.status}` },
        `${process.env.SECRET}`,
        { expiresIn: "1y" }
      ),
    };
  }

  @Mutation(() => AuthenticationMsg)
  async signup(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthenticationMsg> {
    const user = await User.findOne({ email });
    if (user) {
      return {
        status: "USER_EXISTS",
      };
    }
    const newHash = generateRandomString();

    //send an email
    const newUser: IUser = await User.create({
      email,
      verified: false,
      verifyHash: newHash,
      password: await bcrypt.hash(password, 10),
      groupChatsCreated: [],
    });
    await sendEmail(email, emailTypeToContent("confirmEmail", newHash));
    return {
      status: "OK",
      jwtToken: jsonwebtoken.sign(
        { email, status: `${newUser.status}` },
        `${process.env.SECRET}`,
        { expiresIn: "1y" }
      ),
    };
  }
}
