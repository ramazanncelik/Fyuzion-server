import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Like: {
        type: Number,
        required: true
    },
    FullDate: {
        type: String,
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
    Month: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Comment', CommentSchema);