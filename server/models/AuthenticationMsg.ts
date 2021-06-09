import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthenticationMsg {
  @Field()
  status: String;

  @Field({ nullable: true })
  jwtToken?: String;
}
