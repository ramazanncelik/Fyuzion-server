import Query from './resolvers/Query.js'
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import PostLike from "./resolvers/PostLike.js";
import Comment from "./resolvers/Comment.js";
import CommentLike from "./resolvers/CommentLike.js";
import Connection from "./resolvers/Connection.js";
import Notification from "./resolvers/Notification.js";
import Message from "./resolvers/Message.js";
import Chat from "./resolvers/Chat.js";
import Complaint from "./resolvers/Complaint.js";

const resolvers = {
    Query,
    User,
    Post,
    PostLike,
    Comment,
    CommentLike,
    Mutation,
    Subscription,
    Notification,
    Connection,
    Message,
    Chat,
    Complaint
};

export default resolvers;