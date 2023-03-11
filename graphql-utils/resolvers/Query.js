import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";

const Query = {
    //Get All Users
    users: async () => {
        const users = await User.find();
        return users;
    },

    //Get Single User by ID
    user: async (_, args) => {
        const user = await User.findById(args._id);

        console.log(args._id)

        if (!user) {
            throw "User not found";
        }

        return user;
    },
    login: async (_, args) => {
        const user = await User.findOne(args.data);

        if (!user) {
            throw "User not found";
        }

        return user;
    },
    posts: async () => {
        const posts = await Post.find();
        return posts;
    },
    post: async (_, args) => {
        const post = await Post.findById(args._id);

        if (!post) {
            throw "User not found";
        }

        return post;
    },

    comments: async (parent,args) => {
        const comments = await Comment.find();
        console.log(args)
        return comments;
    },
    comment: async (_, args) => {
        const comment = await Post.Comment(args._id);

        if (!comment) {
            throw "User not found";
        }

        return comment;
    },

};

export default Query;