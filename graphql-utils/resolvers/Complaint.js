import User from "../../models/User.js";

const Complaint = {
    user: async (parent) => {
        const user = await User.findById(parent.OwnerId);
        return user;
    },
};

export default Complaint;