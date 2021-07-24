import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { GroupChat as GroupChatModel, User as UserModel } from "../database";
import { GroupChat } from "../models";
import { createGroupChatInput } from "../inputs";
import { GroupChatIds, GroupChatPaginiated } from "../models/Groupchat";
import { departmentToImage, escapeRegex } from "../helpers";

@Resolver(GroupChat)
export class GroupChatResolver {
  pageSize = 8;

  @Query(() => GroupChatIds)
  async getAllGroupChatIds(): Promise<GroupChatIds> {
    const groupChats = await GroupChatModel.find();
    return {
      groupChats: groupChats.map((chat) => chat._id),
    };
  }

  @Query(() => GroupChatPaginiated)
  async getGroupChats(
    @Arg("page", { nullable: true })
    page: number = 0
  ) {
    const groupChats = await GroupChatModel.find()
      .sort({ views: -1, likes: -1 })
      .skip(page * this.pageSize)
      .limit(this.pageSize);
    const totalCount = await GroupChatModel.find().countDocuments();
    if (totalCount === 0) {
      return {
        groupChats: [],
        totalPages: 0,
        pageNumber: 0,
      };
    }
    return {
      groupChats,
      totalPages: Math.ceil(totalCount / this.pageSize) - 1,
      pageNumber: page,
    };
  }

  @Query(() => [GroupChat], { nullable: true })
  async getGroupChatByStatus(@Arg("status") status: string) {
    const GroupChat = await GroupChatModel.find({ status });
    return GroupChat;
  }

  @Query(() => GroupChat, { nullable: true })
  async getGroupChat(@Arg("id") id: string) {
    const GroupChat = await GroupChatModel.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } }
    );
    return GroupChat;
  }

  @Query(() => GroupChatPaginiated, { nullable: true })
  async searchGroupChats(
    @Arg("campus", { nullable: true })
    campus?: string,
    @Arg("department", { nullable: true })
    department?: string,
    @Arg("code", { nullable: true })
    code?: string,
    @Arg("term", { nullable: true })
    term?: string,
    @Arg("year", { nullable: true })
    year?: string,
    @Arg("text", { nullable: true })
    text?: string,
    @Arg("isCommunity", { nullable: true })
    type?: boolean,
    @Arg("page", { nullable: true })
    page: number = 0
  ) {
    let queryObj = {};
    if (campus != undefined && campus !== "") {
      queryObj = { ...queryObj, "courseInformation.campus": campus };
    }
    if (department != undefined && department !== "") {
      queryObj = { ...queryObj, "courseInformation.department": department };
    }
    if (code != undefined && code !== "") {
      queryObj = { ...queryObj, "courseInformation.code": code };
    }
    if (term != undefined && term !== "") {
      queryObj = { ...queryObj, "courseInformation.term": term };
    }
    if (year != undefined && year !== "") {
      queryObj = { ...queryObj, "courseInformation.year": year };
    }
    if (text != undefined && text != "") {
      const regex = new RegExp(escapeRegex(text), "gi");
      queryObj = { ...queryObj, name: regex };
    }
    if (type != undefined) {
      queryObj = { ...queryObj, isCommunity: type };
    }
    const groupChats = await GroupChatModel.find(queryObj)
      .sort({ views: -1, likes: -1 })
      .skip(page * this.pageSize)
      .limit(this.pageSize);
    const totalCount = await GroupChatModel.find(queryObj).countDocuments();
    if (totalCount === 0) {
      return {
        groupChats: [],
        totalPages: 0,
        pageNumber: 0,
      };
    }
    return {
      groupChats,
      totalPages: Math.ceil(totalCount / this.pageSize) - 1,
      pageNumber: page,
    };
  }

  @Mutation(() => GroupChat, { nullable: true })
  async addGroupChat(
    @Arg("email") email: string,
    @Arg("info") groupchatInfo: createGroupChatInput
  ) {
    const user = await UserModel.findOne({ email });

    if (!user) return null;
    if (!user.verified) return null;

    const image = groupchatInfo.isCommunity
      ? departmentToImage.Community
      : departmentToImage[
          groupchatInfo?.courseInformation?.department || "Community"
        ];

    const newGroupChat = await GroupChatModel.create({
      ...groupchatInfo,
      image: image,
      createdBy: email,
    });
    await UserModel.updateOne(
      { email },
      { $push: { groupChatsCreated: newGroupChat._id } }
    );
    return newGroupChat;
  }

  @Mutation(() => GroupChat, { nullable: true })
  async updateGroupChat(
    @Arg("id") id: string,
    @Arg("chatInfo") chatInfo: createGroupChatInput
  ) {
    const groupChat = await GroupChatModel.findOne({ _id: id });
    if (!groupChat) {
      return null;
    }
    if (chatInfo.status != undefined && chatInfo.status != "") {
      groupChat.status = chatInfo.status;
    }
    if (chatInfo.name != undefined && chatInfo.name != "") {
      groupChat.name = chatInfo.name;
    }
    if (chatInfo.description != undefined && chatInfo.description != "") {
      groupChat.description = chatInfo.description;
    }
    if (chatInfo.links != undefined && chatInfo.links.length > 0) {
      groupChat.links = [...chatInfo.links] as typeof groupChat.links;
    }
    if (chatInfo.courseInformation != undefined) {
      groupChat.courseInformation.set(chatInfo.courseInformation);
    }
    groupChat.updated = new Date();
    const result = await groupChat.save();
    return result;
  }

  @Mutation(() => GroupChat, { nullable: true })
  async updateStatus(@Arg("id") id: string, @Arg("status") status: string) {
    const groupChat = await GroupChatModel.findOne({ _id: id });
    if (!groupChat) {
      return null;
    }
    groupChat.status = status;
    const result = await groupChat.save();
    return result;
  }

  @Mutation(() => Boolean)
  async deleteGroupChat(@Arg("id") id: string) {
    const chat = await GroupChatModel.findOne({ _id: id });
    if (chat != undefined) {
      const result = await UserModel.updateOne(
        { email: chat.createdBy },
        { $pull: { groupChatsCreated: id } }
      );
      const result2 = await GroupChatModel.deleteOne({ _id: id });
      return result && result2.n == 1;
    }
    return false;
  }

  @Mutation(() => GroupChat, { nullable: true })
  async incrementLikes(@Arg("id") id: string) {
    const GroupChat = await GroupChatModel.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } }
    );
    return GroupChat;
  }
}
