import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthenticationMsg {
  @Field()
  status: string;

  @Field({ nullable: true })
  jwtToken?: string;
}
