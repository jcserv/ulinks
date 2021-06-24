import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CourseInformation {
  @Field() campus?: string;

  @Field() department?: string;

  @Field() code?: string;

  @Field() term?: string;

  @Field() year: string;
}

@ObjectType()
export class GroupChat {
  @Field() id: string;

  @Field() name: string;

  @Field() description: string;

  @Field(() => [String])
  links: string[];

  @Field() isCommunity: boolean;

  @Field(() => CourseInformation, { nullable: true })
  courseInformation?: CourseInformation;

  @Field() status: string;

  @Field({ nullable: true }) image: string;
}

@ObjectType()
export class GroupChatIds {
  @Field(() => [String])
  groupChats: string[];
}

@ObjectType()
export class GroupChatPaginiated {
  @Field(() => [GroupChat], { nullable: "itemsAndList" })
  groupChats: GroupChat[];

  @Field() totalPages: number;

  @Field() pageNumber: number;
}
