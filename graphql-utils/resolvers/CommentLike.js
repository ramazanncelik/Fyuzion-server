import User from "../../models/User.js";

const CommentLike = {
    user: async (parent) => {
        const user = await User.findById(parent.OwnerId);
        return user;
    },
};

export default CommentLike;