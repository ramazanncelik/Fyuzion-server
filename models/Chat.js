import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    LastMessage: {
        type: String,
        required: false
    },
    LastMessageOwner: {
        type: String,
        required: false
    },
    Type: {
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

export default mongoose.model('Chat', ChatSchema);