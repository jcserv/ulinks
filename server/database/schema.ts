import mongoose, { Document, Schema, Model } from "mongoose";

const CourseInformationSchema: Schema = new Schema({
  campus: String,
  department: String,
  code: String,
  term: {
    type: String,
    enum: ["Fall", "Winter", "Summer", "Year"],
    default: "Fall",
  },
  year: String,
});
const GroupChatSchema: Schema = new Schema(
  {
    name: String,
    description: String,
    isCommunity: Boolean,
    links: [String],
    courseInformation: CourseInformationSchema,
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: ["pending"],
    },
  },
  { toObject: { versionKey: false } }
);

// Schema for User
const UserSchema: Schema = new Schema(
  {
    email: String,
    password: String,
    groupChatsCreated: [Schema.Types.ObjectId],
    status: {
      type: String,
      enum: ["admin", "banned", "user"],
      default: "user",
    },
  },
  { toObject: { versionKey: false } }
);

interface IUser extends Document {
  email: string;
  password: string;
  groupChatsCreated: [string];
  status: string;
}

interface ICourseInformation extends Document {
  campus: String;
  department: String;
  code: String;
  term: String;
  year: Number;
}
interface IGroupChat extends Document {
  name: string;
  description: string;
  isCommunity: Boolean;
  links: [string];
  courseInformation: ICourseInformation;
  status: string;
}

const User: Model<IUser> = mongoose.model("Users", UserSchema);

const GroupChat: Model<IGroupChat> = mongoose.model(
  "GroupChats",
  GroupChatSchema
);

export { mongoose, User, GroupChat, IUser, IGroupChat };
