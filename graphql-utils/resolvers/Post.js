import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

const Post = {
    user: async (parent) => {
        const user = await User.findById(parent.OwnerId);
        return user;
    },
    comments: async (parent) => {
        const comments = await Comment.find({ PostId: parent._id });
        return comments;
    },
};

export default Post;