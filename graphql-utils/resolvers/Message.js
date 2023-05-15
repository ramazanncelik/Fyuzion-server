import User from "../../models/User.js";

const Message = {
    fromUser: async (parent) => {
        const user = await User.findById(parent.From);
        return user;
    },
};

export default Message;