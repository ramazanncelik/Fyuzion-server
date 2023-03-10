import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

export default mongoose.model('Comment', CommentSchema);