import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CourseInformation {
  @Field() campus?: string;

  @Field() department?: string;

  @Field() code?: String;

  @Field() term?: string;

  @Field() year: String;
}

@ObjectType()
export class GroupChat {
  @Field() id: String;

  @Field() name: string;

  @Field() description: string;

  @Field(() => [String])
  links: String[];

  @Field() isCommunity: Boolean;

  @Field(() => CourseInformation, { nullable: true })
  courseInformation?: CourseInformation;

  @Field() status: string;
}

@ObjectType()
export class GroupChatIds {
  @Field(() => [String])
  groupChats: String[];
}

@ObjectType()
export class GroupChatPaginiated {
  @Field(() => [GroupChat], { nullable: "itemsAndList" })
  groupChats: GroupChat[];

  @Field() totalPages: Number;

  @Field() pageNumber: Number;
}
