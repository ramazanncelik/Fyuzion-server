import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";

const User = {
    posts: async (parent) => {
        const posts = await Post.find({ OwnerId: parent._id });
        return posts;
    },
    comments: async (parent) => {
        const comments = await Comment.find({ user_id: parent._id });
        return comments;
    },
};

export default User;