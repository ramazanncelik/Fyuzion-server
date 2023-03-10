import Query from './resolvers/Query.js'
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import Comment from "./resolvers/Comment.js";

const resolvers = {
    Query,
    User,
    Post,
    Comment,
    Mutation,
    Subscription
};

export default resolvers;