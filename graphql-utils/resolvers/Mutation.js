import pubSub from '../pubsub.js'
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import PostLike from "../../models/PostLike.js";
import Comment from "../../models/Comment.js";
import Connection from '../../models/Connection.js';
import Notification from '../../models/Notification.js';
import SavedPost from '../../models/SavedPost.js';
import Message from '../../models/Message.js';
import Chat from '../../models/Chat.js';

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
                const newUser = await user.save();
                pubSub.publish("userCreated", { userCreated: newUser });
                return true;
            }
        } catch {
            return false;
        }
    },
    updateUser: async (_, { _id, data }) => {
        try {
            if (data.NickName) {
                const findNickNameUser = await User.findOne({ NickName: data.NickName });
                if (findNickNameUser) {
                    if (_id == findNickNameUser._id) {
                        const user = await User.findByIdAndUpdate(_id, data, { new: true });
                        pubSub.publish("userUpdated", { userUpdated: user });
                        return true;
                    } else {
                        return false;
                    }
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
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    },
    updatePost: async (_, { post_id, data }) => {
        try {
            const post = await Post.findByIdAndUpdate(post_id, data, { new: true });
            pubSub.publish("postUpdated", { postUpdated: post });
            return true;
        } catch {
            return false;
        }
    },
    deletePost: async (_, { post_id }) => {
        try {
            const post = await Post.findById(post_id);
            await Post.findByIdAndDelete(post_id);
            pubSub.publish("postDeleted", { postUpdated: post });
            return true;
        } catch {
            return false;
        }
    },

    // Lile
    createPostLike: async (_, { data }) => {
        const post = await Post.findById(data.PostId);
        if (post) {
            const like = new PostLike(data);
            const newLike = await like.save();
            pubSub.publish("postLikeCreated", { postLikeCreated: newLike });
            const updatedPost = await Post.findByIdAndUpdate(data.PostId, { Like: post.Like + 1 }, { new: true })
            pubSub.publish("postUpdated", { postUpdated: updatedPost });
            return true;
        } else {
            return false;
        }
    },
    deletePostLike: async (_, { like_id }) => {
        const deletedPostLike = await PostLike.findByIdAndDelete(like_id);
        if (deletedPostLike) {
            const post = await Post.findById(deletedPostLike.PostId);
            if (post) {
                const updatedPost = await Post.findByIdAndUpdate(post._id, { Like: post.Like - 1 }, { new: true })
                pubSub.publish("postUpdated", { postUpdated: updatedPost });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteAllPostLike: async (_, { post_id }) => {
        const deletedPostLikes = await PostLike.find({ PostId: post_id });
        if (deletedPostLikes.length !== 0) {
            for (let i = 0; i < deletedPostLikes.length; i++) {
                await PostLike.findByIdAndDelete(deletedPostLikes[i]._id);
                if (i + 1 === deletedPostLikes.length) {
                    const updatedPost = await Post.findByIdAndUpdate(post_id, { Like: 0 }, { new: true })
                    pubSub.publish("postUpdated", { postUpdated: updatedPost });
                    return true;
                }
            }
        } else {
            return false;
        }
    },

    // Comment
    createComment: async (_, { data }) => {
        const post = await Post.findById(data.PostId);
        if (post) {
            const comment = new Comment(data);
            const newComment = await comment.save();
            pubSub.publish("commentCreated", { commentCreated: newComment });
            const updatedPost = await Post.findByIdAndUpdate(data.PostId, { Comment: post.Comment + 1 }, { new: true })
            pubSub.publish("postUpdated", { postUpdated: updatedPost });
            return true;
        } else {
            return false;
        }
    },
    deleteComment: async (_, { comment_id }) => {
        const comment = await Comment.findById(comment_id);
        if (comment) {
            const post = await Post.findById(comment.PostId);
            if (post) {
                await Comment.findByIdAndDelete(comment_id);
                pubSub.publish("commentDeleted", { commentDeleted: comment });
                const updatedPost = await Post.findByIdAndUpdate(post._id, { Comment: post.Comment - 1 }, { new: true })
                pubSub.publish("postUpdated", { postUpdated: updatedPost });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteAllComment: async (_, { post_id }) => {
        const deletedComments = await Comment.find({ PostId: post_id });
        if (deletedComments.length !== 0) {
            for (let i = 0; i < deletedComments.length; i++) {
                await Comment.findByIdAndDelete(deletedComments[i]._id);
                if (i + 1 === deletedComments.length) {
                    return true;
                }
            }
        } else {
            return false;
        }
    },

    // Connection
    createConnection: async (_, { data }) => {
        const connection = new Connection(data);
        const newConnection = await connection.save();
        if (newConnection) {
            const fromUser = await User.findById(data.From);
            const updateFromUser = await User.findByIdAndUpdate(fromUser._id, { MyFollowed: fromUser.MyFollowed + 1 }, { new: true });
            if (updateFromUser) {
                const toUser = await User.findById(data.To);
                const updateToUser = await User.findByIdAndUpdate(toUser._id, { Follower: toUser.Follower + 1 }, { new: true });
                if (updateToUser) {
                    pubSub.publish("followerCreated", { followerCreated: newConnection });
                    pubSub.publish("myFollowedCreated", { myFollowedCreated: newConnection });
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteConnection: async (_, { connection_id }) => {
        const connection = await Connection.findById(connection_id);
        if (connection) {
            const fromUser = await User.findById(connection.From);
            const updateFromUser = await User.findByIdAndUpdate(fromUser._id, { MyFollowed: fromUser.MyFollowed - 1 }, { new: true });
            if (updateFromUser) {
                const toUser = await User.findById(connection.To);
                const updateToUser = await User.findByIdAndUpdate(toUser._id, { Follower: toUser.Follower - 1 }, { new: true });
                if (updateToUser) {
                    await Connection.findByIdAndDelete(connection_id);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    // Notification
    createNotification: async (_, { data }) => {
        const notification = new Notification(data);
        const newNotification = await notification.save();
        if (newNotification) {
            pubSub.publish("notificationCreated", { notificationCreated: newNotification });
            return true;
        } else {
            return false;
        }
    },
    deleteNotification: async (_, { notification_id }) => {
        const notification = await Notification.findByIdAndDelete(notification_id);
        if (notification) {
            return true;
        } else {
            return false;
        }
    },

    // SavedPost
    createSavedPost: async (_, { data }) => {
        const savedPost = new SavedPost(data);
        const newSavedPost = await savedPost.save();
        if (newSavedPost) {
            pubSub.publish("savedPostCreated", { savedPostCreated: newSavedPost });
            return true;
        } else {
            return false;
        }
    },
    deleteSavedPost: async (_, { savedPost_id }) => {
        const savedPost = await SavedPost.findByIdAndDelete(savedPost_id);
        if (savedPost) {
            return true;
        } else {
            return false;
        }
    },

    // Message
    createMessage: async (_, { data }) => {
        const fromMessage = new Message({ ...data, ChatId: data.From + "_" + data.To });
        const toMessage = new Message({ ...data, ChatId: data.To + "_" + data.From });
        const newFromMessage = await fromMessage.save();
        const newToMessage = await toMessage.save();
        if (newFromMessage) {
            pubSub.publish("messageCreated", { messageCreated: newFromMessage });
            if (newToMessage) {
                pubSub.publish("messageCreated", { messageCreated: newToMessage });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteMessage: async (_, { data }) => {
        if (data.type === "from me") {
            const message = await Message.findByIdAndDelete(data.message_id);
            if (message) {
                return true;
            } else {
                return false;
            }
        } else {
            const messages = await Message.find({ From: data.from, To: data.to, Time: data.time });
            for (let i = 0; i < messages.length; i++) {
                const messageDeleted = await Message.findByIdAndDelete(messages[i]._id);
                if (messageDeleted) {
                    if (i + 1 === messages.length) {
                        return true;
                    }
                } else {
                    return false
                }
            }
        }
    },

    // Chat
    createChat: async (_, { data }) => {
        const fromChat = new Chat(data);
        const toChat = new Chat({ ...data, From: data.To, To: data.From });
        const newFromChat = await fromChat.save();
        const newToChat = await toChat.save();
        if (newFromChat) {
            pubSub.publish("chatCreated", { chatCreated: newFromChat });
            if (newToChat) {
                pubSub.publish("chatCreated", { chatCreated: newToChat });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    updateChat: async (_, { chatData, data }) => {
        const fromChat = await Chat.findOneAndUpdate(chatData, data, { new: true });
        const toChat = await Chat.findOneAndUpdate({ From: chatData.To, To: chatData.From }, data, { new: true });
        if (fromChat) {
            pubSub.pubblish("chatUpdated", { chatUpdated: fromChat })
            if (toChat) {
                pubSub.pubblish("chatUpdated", { chatUpdated: toChat })
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteChat: async (_, { chat_id }) => {
        const chat = await Chat.findByIdAndDelete(chat_id);
        if (chat) {
            return true;
        } else {
            return false;
        }
    },
};

export default Mutation;