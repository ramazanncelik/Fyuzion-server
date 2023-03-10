import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

const Post = {
    user: async (parent) => {
        const user = await User.findById(parent.user_id);
        return user;
    },
    comments: async (parent) => {
        const comments = await Comment.find({ post_id: parent._id });
        return comments;
    },
};

export default Post;