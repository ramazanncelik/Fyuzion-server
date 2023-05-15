import User from "../../models/User.js";

const Notification = {
    fromUser: async (parent) => {
        const fromUser = await User.findById(parent.From);
        return fromUser;
    },
};

export default Notification;