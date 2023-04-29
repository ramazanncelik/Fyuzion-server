import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import PostLike from "../../models/PostLike.js";
import User from "../../models/User.js";
import Connection from "../../models/Connection.js";
import Notification from "../../models/Notification.js";
import SavedPost from "../../models/SavedPost.js";

const Query = {
    //Get All Users
    users: async () => {
        try {
            const users = await User.find();
            return users;
        } catch {
            return null;
        }
    },

    //Get Single User by ID
    user: async (_, { _id }) => {
        try {
            const user = await User.findById(_id);
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },
    login: async (_, { data }) => {
        try {
            const user = await User.findOne(data);
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },

    // Post
    posts: async (_, { user_id }) => {
        try {
            if (user_id) {
                const posts = await Post.find({ OwnerId: user_id });
                return posts;
            } else {
                const posts = await Post.find();
                return posts;
            }
        } catch {
            return null;
        }
    },
    post: async (_, { _id }) => {
        try {
            const post = await Post.findById(_id);
            if (post) {
                return post;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },

    // Comment
    comments: async (_, { post_id }) => {
        try {
            const comments = await Comment.find({ PostId: post_id });
            return comments;
        } catch {
            return null;
        }
    },
    comment: async (_, { _id }) => {
        try {
            const comment = await Post.Comment(_id);
            if (comment) {
                return comment;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },

    // PostLike
    postLikes: async (_, { post_id }) => {
        try {
            const postLikes = await PostLike.find({ PostId: post_id });
            return postLikes;
        } catch {
            return null;
        }
    },

    postLike: async (_, { data }) => {
        try {
            const postLike = await PostLike.findOne(data);

            if (postLike) {
                return postLike;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },

    // Connection
    followers: async (_, { user_id }) => {
        try {
            const followers = await Connection.find({ To: user_id });
            return followers;
        } catch {
            return null;
        }
    },

    myFolloweds: async (_, { user_id }) => {
        try {
            const myFolloweds = await Connection.find({ From: user_id });
            return myFolloweds;
        } catch {
            return null;
        }
    },

    connection: async (_, { data }) => {
        try {
            const connection = await Connection.findOne(data);
            if (connection) {
                return connection;
            } else {
                return null;
            }
        } catch {
            return null
        }
    },

    // Notifications
    notifications: async (_, { user_id }) => {
        try {
            const notifications = await Notification.find({ To: user_id });
            return notifications;
        } catch {
            return null;
        }
    },
    notification: async (_, { data }) => {
        try {
            const notification = await Notification.findOne(data);
            if (notification) {
                return notification;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    },

    // SavedPost
    savedPosts: async (_, { user_id }) => {
        try {
            const savedPosts = await SavedPost.find({ OwnerId: user_id });
            return savedPosts;
        } catch {
            return null;
        }
    },
    savedPost: async (_, { data }) => {
        try {
            const savedPost = await SavedPost.findOne(data);
            if (savedPost) {
                return savedPost;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    }
};

export default Query;