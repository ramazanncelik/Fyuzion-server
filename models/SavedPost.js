import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const SavedPostSchema = new Schema({
    OwnerId: {
        type: String,
        required: true
    },
    PostId: {
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
});

export default mongoose.model('SavedPost', SavedPostSchema);