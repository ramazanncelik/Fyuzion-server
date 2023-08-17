import pubSub from '../pubsub.js'
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import PostLike from "../../models/PostLike.js";
import Comment from "../../models/Comment.js";
import CommentLike from "../../models/CommentLike.js";
import Connection from '../../models/Connection.js';
import Notification from '../../models/Notification.js';
import SavedPost from '../../models/SavedPost.js';
import Message from '../../models/Message.js';
import Chat from '../../models/Chat.js';
import Complaint from '../../models/Complaint.js';
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const Mutation = {
    // User
    createUser: async (_, { data }) => {
        try {
            const emailExist = await User.findOne({ Email: data.Email });
            const nickNameExist = await User.findOne({ NickName: data.NickName });
            if (emailExist || nickNameExist) {
                return { success: false, emailExist: emailExist ? true : false, nickNameExist: nickNameExist ? true : false }
            } else {
                const user = new User(data);
                const newUser = await user.save();
                if (newUser) {
                    pubSub.publish("userCreated", { userCreated: newUser });
                    return { success: true, emailExist: false, nickNameExist: false }
                } else {
                    return { success: false, emailExist: false, nickNameExist: false }
                }
            }
        } catch {
            return { success: false, emailExist: false, nickNameExist: false }
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
                        return { success: true, nickNameExist: false }
                    } else {
                        return { success: false, nickNameExist: true }
                    }
                } else {
                    const user = await User.findByIdAndUpdate(_id, data, { new: true });
                    pubSub.publish("userUpdated", { userUpdated: user });
                    return { success: true, nickNameExist: false }
                }
            } else {
                const user = await User.findByIdAndUpdate(_id, data, { new: true });
                pubSub.publish("userUpdated", { userUpdated: user });
                return { success: true, nickNameExist: false }
            }
        } catch (error) {
            return { success: false, nickNameExist: false }
        }
    },

    updatePassword: async (_, { data }) => {
        try {
            const userExist = await User.findOne({ Email: data.Email, ConfirmationCode: data.ConfirmationCode });
            if (userExist) {
                const userUpdated = await User.findByIdAndUpdate(
                    userExist._id,
                    {
                        Password: data.Password,
                        ConfirmationCode: (Math.floor(Math.random() * 90000) + 10000).toString(),
                    },
                    { new: true });
                if (userUpdated) {
                    pubSub.publish("userUpdated", { userUpdated: userUpdated });
                    return { success: true, userExist: true }
                } else {
                    return { success: false, userExist: true }
                }
            } else {
                return { success: false, userExist: false }
            }
        } catch (error) {
            return { success: false, userExist: false }
        }
    },
    updateEmailVerify: async (_, { data }) => {
        try {
            const userExist = await User.findOne({ Email: data.Email, ConfirmationCode: data.ConfirmationCode });
            if (userExist) {
                const userUpdated = await User.findByIdAndUpdate(
                    userExist._id,
                    {
                        EmailVerify: true,
                        ConfirmationCode: (Math.floor(Math.random() * 90000) + 10000).toString(),
                    },
                    { new: true });
                if (userUpdated) {
                    pubSub.publish("userUpdated", { userUpdated: userUpdated });
                    return { success: true, userExist: true }
                } else {
                    return { success: false, userExist: true }
                }
            } else {
                return { success: false, userExist: false }
            }
        } catch (error) {
            return { success: false, userExist: false }
        }
    },

    // Mail
    createResetPasswordMail: async (_, { data }) => {
        const user = await User.findOne({ Email: data.to });
        if (user) {
            const resetLink = `https://fyuzion.vercel.app/auth/resetpassword?Email=${data.to}&ConfirmationCode=${user.ConfirmationCode}`;

            const html = `<p>Hi ${user.NickName},</p>
             <p>${data.text}:</p>
             <a href="${resetLink}">${resetLink}</a>`;
            await transporter.sendMail({
                from: process.env.EMAIL,
                ...data,
                html: html
            });
            return true;
        } else {
            return false;
        }
    },
    createEmailVerifyMail: async (_, { data }) => {
        const user = await User.findOne({ Email: data.to });
        if (user) {
            const emailVerifyLink = `https://fyuzion.vercel.app/auth/emailverify?Email=${data.to}&ConfirmationCode=${user.ConfirmationCode}`;

            const html = `<p>Hi ${user.NickName},</p>
             <p>${data.text}:</p>
             <a href="${emailVerifyLink}">${emailVerifyLink}</a>`;
            await transporter.sendMail({
                ...data,
                from: process.env.EMAIL,
                html: html
            });
            return true;
        } else {
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
            const post = await Post.findByIdAndDelete(post_id);
            pubSub.publish("postDeleted", { postDeleted: post });
            return true;
        } catch {
            return false;
        }
    },

    // PostLike
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

    // CommentLike
    createCommentLike: async (_, { data }) => {
        const comment = await Comment.findById(data.CommentId);
        if (comment) {
            const like = new CommentLike(data);
            const newLike = await like.save();
            pubSub.publish("commentLikeCreated", { commentLikeCreated: newLike });
            const updatedComment = await Comment.findByIdAndUpdate(data.CommentId, { Like: comment.Like + 1 }, { new: true })
            pubSub.publish("commentUpdated", { commentUpdated: updatedComment });
            return true;
        } else {
            return false;
        }
    },
    deleteCommentLike: async (_, { like_id }) => {
        const deletedCommentLike = await CommentLike.findByIdAndDelete(like_id);
        if (deletedCommentLike) {
            const comment = await Comment.findById(deletedCommentLike.CommentId);
            if (comment) {
                const updatedComment = await Comment.findByIdAndUpdate(comment._id, { Like: comment.Like - 1 }, { new: true })
                pubSub.publish("commentUpdated", { commentUpdated: updatedComment });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteAllCommentLike: async (_, { comment_id }) => {
        const deletedCommentLikes = await CommentLike.find({ CommentId: comment_id });
        if (deletedCommentLikes.length !== 0) {
            for (let i = 0; i < deletedCommentLikes.length; i++) {
                await CommentLike.findByIdAndDelete(deletedCommentLikes[i]._id);
                if (i + 1 === deletedCommentLikes.length) {
                    const updatedComment = await Comment.findByIdAndUpdate(comment_id, { Like: 0 }, { new: true })
                    pubSub.publish("commentUpdated", { commentUpdated: updatedComment });
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
            pubSub.publish("notificationDeleted", { notificationDeleted: notification });
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
    updateMessage: async (_, { data }) => {
        const fromMessage = data.from + "_" + data.to
        const toMessage = data.to + "_" + data.from
        const fromMessageUpdated = await Message.findOneAndUpdate({ ChatId: fromMessage, Time: data.time }, { Description: data.Description, IsEdited: true }, { new: true });
        const toMessageUpdated = await Message.findOneAndUpdate({ ChatId: toMessage, Time: data.time }, { Description: data.Description, IsEdited: true }, { new: true });

        if (fromMessageUpdated || toMessageUpdated) {
            pubSub.publish("messageUpdated", { messageUpdated: fromMessageUpdated });
            pubSub.publish("messageUpdated", { messageUpdated: toMessageUpdated });
            return true;
        } else {
            return false;
        }
    },
    deleteMessage: async (_, { data }) => {
        if (data.type === "from me") {
            const message = await Message.findByIdAndDelete(data.message_id);
            if (message) {
                pubSub.publish("messageDeleted", { messageDeleted: message });
                return true;
            } else {
                return false;
            }
        } else {
            const fromMessage = data.from + "_" + data.to
            const toMessage = data.to + "_" + data.from
            const fromMessageDeleted = await Message.findOneAndDelete({ ChatId: fromMessage, Time: data.time });
            const toMessageDeleted = await Message.findOneAndDelete({ ChatId: toMessage, Time: data.time });
            if (fromMessageDeleted || toMessageDeleted) {
                pubSub.publish("messageDeleted", { messageDeleted: fromMessageDeleted });
                pubSub.publish("messageDeleted", { messageDeleted: toMessageDeleted });
                return true;
            } else {
                return false;
            }
        }
    },

    // Chat
    createOrUpdateChat: async (_, { fromToData, data }) => {
        const fromChatExists = await Chat.findOne(fromToData);
        const toChatExists = await Chat.findOne({ From: fromToData.To, To: fromToData.From });

        if (fromChatExists) {
            const fromChat = await Chat.findOneAndUpdate(fromToData, data, { new: true });
            pubSub.publish("chatUpdated", { chatUpdated: fromChat })
        } else {
            const nFromChat = new Chat({ ...fromToData, ...data });
            const newFromChat = await nFromChat.save();
            pubSub.publish("chatCreated", { chatCreated: newFromChat });
        }

        if (toChatExists) {
            const toChat = await Chat.findOneAndUpdate({ From: fromToData.To, To: fromToData.From }, data, { new: true });
            pubSub.publish("chatUpdated", { chatUpdated: toChat })
        } else {
            const nToChat = new Chat({ From: fromToData.To, To: fromToData.From, ...data });
            const newToChat = await nToChat.save();
            pubSub.publish("chatCreated", { chatCreated: newToChat });
        }

        return true;
    },
    deleteChat: async (_, { chat_id }) => {
        const chat = await Chat.findByIdAndDelete(chat_id);
        if (chat) {
            pubSub.publish("chatDeleted", { chatDeleted: chat })
            return true;
        } else {
            return false;
        }
    },

    // Complaint
    createComplaint: async (_, { data }) => {
        const complaint = new Complaint(data);
        const newComplaint = await complaint.save();
        if (newComplaint) {
            return true;
        } else {
            return false;
        }
    },
    deleteComplaint: async (_, { complaint_id }) => {
        const deletedComplaint = await Complaint.findByIdAndDelete(complaint_id);
        if (deletedComplaint) {
            return true;
        } else {
            return false;
        }
    },
};

export default Mutation;