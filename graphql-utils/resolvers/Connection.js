import User from "../../models/User.js";

const Connection = {
    fromUser: async (parent) => {
        const fromUser = await User.findById(parent.From);
        return fromUser;
    },
    toUser: async (parent) => {
        const toUser = await User.findById(parent.To);
        return toUser;
    },
};

export default Connection;