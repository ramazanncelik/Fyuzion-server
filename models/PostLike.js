import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PostLikeSchema = new Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
});

export default mongoose.model('PostLike', PostLikeSchema);