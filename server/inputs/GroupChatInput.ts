import { Field, InputType } from "type-graphql";

@InputType()
export class courseInformationInput {
  @Field() campus: string;

  @Field() department: string;

  @Field() code: string;

  @Field() term: string;

  @Field() year: string;
}

@InputType()
export class createGroupChatInput {
  @Field() name: string;

  @Field() description: string;

  @Field() isCommunity: boolean;

  @Field(() => [String])
  links: string[];

  @Field(() => courseInformationInput, { nullable: true })
  courseInformation?: courseInformationInput;

  @Field() status: string;
}
