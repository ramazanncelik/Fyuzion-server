import pubSub from '../pubsub.js'
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const Mutation = {
    // User
    createUser: async (_, { data }) => {
        try {
            const user = new User(data);
            const findEmailUser = await User.findOne({ Email: data.Email });
            const findNickNameUser = await User.findOne({ NickName: data.NickName });
            if (findEmailUser || findNickNameUser) {
                return false;
            } else {
                await user.save();
                pubSub.publish("userCreated", { userCreated: user });
                return true;
            }
        } catch (error) {
            return error;
        }
    },
    updateUser: async (_, { _id, data }) => {
        try {
            if (data.NickName) {
                const findNickNameUser = await User.findOne({ NickName: data.NickName });
                if (findNickNameUser) {
                    console.log("Kullanıcı adı kullanımda.");
                    return false;
                } else {
                    const user = await User.findByIdAndUpdate(_id, data, { new: true });
                    pubSub.publish("userUpdated", { userUpdated: user });
                    return true;
                }
            } else {
                const user = await User.findByIdAndUpdate(_id, data, { new: true });
                pubSub.publish("userUpdated", { userUpdated: user });
                return true;
            }
        } catch (error) {
            return false;
        }
    },
    // Post
    createPost: async (_, { data }) => {
        const post = new Post(data);
        const newPost = await post.save();
        const user = User.findById(data.OwnerId);
        if (newPost) {
            if (user) {
                pubSub.publish("postCreated", { postCreated: newPost });
                return newPost;
            } else {
                return false;
            }
        } else {
            return false;
        }

    },
    updatePost: async (_, { data }) => {
        try {
            await Post.findByIdAndUpdate(data._id, { ...data });
            const post = await Post.findById(data._id);
            pubSub.publish("postUpdated", { postUpdated: post });
            return post;
        } catch (error) {
            return error;
        }
    },
    deletePost: async (_, { data }) => {
        try {
            const post = await Post.findById(data._id);
            await Post.findOneAndDelete(data._id);
            pubSub.publish("postDeleted", { postUpdated: post });
            return post;
        } catch (error) {
            return error;
        }
    },
    deleteAllPost: async (_, __) => {
        const deletePosts = await Post.find();
        for (let i = 0; i < deletePosts.length; i++) {
            Post.findByIdAndDelete(deletePosts[i]._id).exec();
        }
        const posts = await Post.find();
        pubSub.publish("userDeletedAll", { postDeletedAll: posts.length });
        return posts.length;
    },
    // Comment
    createComment: (_, { data }) => {
        const comment = new Comment(data);
        comment.save();
        pubSub.publish("commentCreated", { commentCreated: comment });
        return comment;
    },
    deleteComment: async (_, { data }) => {
        try {
            const comment = await Comment.findById(data._id);
            await Comment.findOneAndDelete(data._id);
            pubSub.publish("postDeleted", { commentUpdated: comment });
            return comment;
        } catch (error) {
            return error;
        }
    },
    /*deleteAllComment: async () => {
        const deletePosts = await Post.find();
        console.log(deletePosts);
        for (let i = 0; i < deletePosts.length; i++) {
            Post.findByIdAndDelete(deletePosts[i]._id).exec();
        }
        const posts = await Post.find();
        pubSub.publish("userDeletedAll", { postDeletedAll: posts.length });
        return posts.length;
    },*/
};

export default Mutation;