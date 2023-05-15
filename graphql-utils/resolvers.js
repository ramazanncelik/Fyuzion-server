import Query from './resolvers/Query.js'
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import PostLike from "./resolvers/PostLike.js";
import Comment from "./resolvers/Comment.js";
import Connection from "./resolvers/Connection.js";
import Notification from "./resolvers/Notification.js";
import Message from "./resolvers/Message.js";
import Chat from "./resolvers/Chat.js";

const resolvers = {
    Query,
    User,
    Post,
    PostLike,
    Comment,
    Mutation,
    Subscription,
    Notification,
    Connection,
    Message,
    Chat
};

export default resolvers;