import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { AuthenticationMsg } from "../models";
import { User } from "../database";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import { IUser } from "../database/schema";

@Resolver()
export class AuthenticationResolver {
  @Authorized("user")
  @Query(() => String, { nullable: true })
  async me() {
    return "Hello";
  }
  @Query(() => AuthenticationMsg)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
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
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ email });
    if (user) {
      return {
        status: "USER_EXISTS",
      };
    }
    const newUser: IUser = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      groupChatsCreated: [],
    });
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
