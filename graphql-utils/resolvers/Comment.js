import User from "../../models/User.js";


const Comment = {
    user: async (parent) => {
        const user = await User.findById(parent.OwnerId);
        return user;
    },
};

export default Comment;