import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentLikeSchema = new Schema({
    OwnerId: {
        type: String,
        required: true
    },
    CommentId: {
        type: String,
        required: true
    },
});

export default mongoose.model('CommentLike', CommentLikeSchema);