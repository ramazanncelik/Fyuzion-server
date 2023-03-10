import pubSub from '../pubSub'
import User from "../../models/User";
import Post from "../../models/Post";
import Comment from "../../models/Comment";

const Mutation = {
    // User
    createUser: async (_, { data }) => {
        try {
            const user = new User(data);
            user.save();
            pubSub.publish("userCreated", { userCreated: user });
            return user;
        } catch (error) {
            return error;
        }
    },
    updateUser: async (_, { data }) => {
        try {
            await User.findOneAndUpdate(data._id, { ...data });
            const user = await User.findById(data._id);
            pubSub.publish("userUpdated", { userUpdated: user });
            return user;
        } catch (error) {
            return error;
        }
    },
    deleteUser: async (_, { data }) => {
        try {
            const user = await User.findById(data._id);
            await User.findOneAndDelete(data._id);
            pubSub.publish("userDeleted", { userUpdated: user });
            return user;
        } catch (error) {
            return error;
        }
    },
    deleteAllUser: async (_, __) => {
        const deleteUsers = await User.find();
        console.log(deleteUsers);
        for (let i = 0; i < deleteUsers.length; i++) {
            User.findByIdAndDelete(deleteUsers[i]._id).exec();
        }
        const users = await User.find();
        pubSub.publish("userDeletedAll", { userDeletedAll: users.length });
        return users.length;
    },
    // Post
    createPost: (_, { data }) => {
        const post = new Post(data);
        post.save();
        pubSub.publish('postCreated', { postCreated: post });
        pubSub.publish('postCount', { postCount: posts.length });
        return post;
    },
    updatePost: async (_, { data }) => {
        try {
            await Post.findOneAndUpdate(data._id, { ...data });
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
        console.log(deletePosts);
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
