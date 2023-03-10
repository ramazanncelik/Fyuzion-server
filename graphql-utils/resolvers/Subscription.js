import pubSub from '../pubSub.js'
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
        subscribe: () => {
            return pubSub.asyncIterator(['userUpdated']);
        }
    },
    userDeleted: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['userDeleted']);
        }
    },
    userDeletedAll: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['userDeletedAll']);
        }
    },


    // Post
    postCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['postCreated']);
            },
            (payload, variables) => {
                return variables.user_id ? payload.postCreated.user_id === variables.user_id : true;
            }
        )
    },
    postUpdated: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['postUpdated']);
        }
    },
    postDeleted: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['postDeleted']);
        }
    },
    postDeletedAll: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['postDeletedAll']);
        }
    },
    postCount: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['postCount']);
        }
    },


    // Comment
    commentCreated: {
        // More on pubSub below
        subscribe: withFilter(
            () => {
                return pubSub.asyncIterator(['commentCreated']);
            },
            (payload, variables) => {
                return variables.post_id ? payload.commentCreated.post_id === variables.post_id : true;
            }
        )
    },
    commentUpdated: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['commentUpdated']);
        }
    },
    commentDeleted: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['commentDeleted']);
        }
    },
    commentDeletedAll: {
        // More on pubSub below
        subscribe: () => {
            return pubSub.asyncIterator(['commentDeletedAll']);
        }
    },
};

export default Subscription;