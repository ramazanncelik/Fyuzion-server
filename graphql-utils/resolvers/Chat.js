import User from "../../models/User.js";

const Chat = {
    toUser: async (parent) => {
        const user = await User.findById(parent.To);
        return user;
    },
    lastMessageOwner: async (parent) => {
        const user = await User.findById(parent.LastMessageOwner);
        return user;
    },
};

export default Chat;