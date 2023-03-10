import Post from "../../models/Post.js";
import User from "../../models/User.js";


const Comment = {
    user: async (parent) => {
        const user = await User.findById(parent.user_id);
        return user;
    },
    post: async (parent) => {
        const post = await Post.findById(parent.post_id);
        return post;
    },
};

export default Comment;