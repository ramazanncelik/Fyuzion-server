import User from "../../models/User.js";

const PostLike = {
    user: async (parent) => {
        const user = await User.findById(parent.OwnerId);
        return user;
    },
};

export default PostLike;