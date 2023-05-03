import pubSub from '../pubsub.js'
import { withFilter } from "graphql-subscriptions";

const Subscription = {
    // User
    userCreated: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['userCreated']);
        }
    },
    userUpdated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['userUpdated']);
            },
            (payload, variables) => {
                return payload.userUpdated._id == variables.user_id;
            }
        )
    },

    // Post
    postCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['postCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.postCreated.OwnerId === variables.user_id : true;
            }
        )
    },

    // Like
    postLikeCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['postLikeCreated']);
            },
            (payload, variables) => {
                return variables.post_id ? payload.postLikeCreated.PostId === variables.post_id : true;
            }
        )
    },

    // Comment
    commentCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['commentCreated']);
            },
            (payload, variables) => {
                return variables.post_id ? payload.commentCreated.PostId === variables.post_id : true;
            }
        )
    },

    // SavedPost
    savedPostCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['savedPostCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.savedPostCreated.OwnerId === variables.user_id : true;
            }
        )
    },

    // Connection
    followerCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['followerCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.followerCreated.To === variables.user_id : true;
            }
        )
    },
    myFollowedCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['myFollowedCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.myFollowedCreated.From === variables.user_id : true;
            }
        )
    },

    // Notification
    notificationCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['notificationCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.notificationCreated.To == variables.user_id : true;
            }
        )
    },

    // Message
    messageCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['messageCreated']);
            },
            (payload, variables) => {
                return variables.chat_id ? payload.messageCreated.ChatId == variables.chat_id : true;
            }
        )
    },

    // Chat
    chatCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['chatCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.chatCreated.From == variables.user_id : true;
            }
        )
    },
    chatUpdated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['chatUpdated']);
            },
            (payload, variables) => {
                return variables.chat_id ? payload.chatCreated._id == variables.chat_id : true;
            }
        )
    },
};

export default Subscription;