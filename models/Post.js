import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    OwnerId: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Files: {
        type: Array,
        required: false
    },
    Like: {
        type: Number,
        required: true
    },
    Comment: {
        type: Number,
        required: true
    },
    CommentsIsClosed: {
        type: Boolean,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
});

export default mongoose.model('Post', PostSchema);