import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
});

export default mongoose.model('Post', PostSchema);