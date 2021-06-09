import { ObjectType, Field } from "type-graphql";
import { GroupChat } from "./Groupchat";

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  status: string;

  @Field(() => [GroupChat], { nullable: "items" })
  groupChatsCreated: GroupChat[];
}
