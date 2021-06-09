"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupChat = exports.User = exports.mongoose = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.mongoose = mongoose_1.default;
const CourseInformationSchema = new mongoose_1.Schema({
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
const GroupChatSchema = new mongoose_1.Schema({
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
}, { toObject: { versionKey: false } });
// Schema for User
const UserSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    groupChatsCreated: [mongoose_1.Schema.Types.ObjectId],
    status: {
        type: String,
        enum: ["admin", "banned", "user"],
        default: "user",
    },
}, { toObject: { versionKey: false } });
const User = mongoose_1.default.model("Users", UserSchema);
exports.User = User;
const GroupChat = mongoose_1.default.model("GroupChats", GroupChatSchema);
exports.GroupChat = GroupChat;
//# sourceMappingURL=schema.js.map