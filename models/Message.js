import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    File: {
        type: Object,
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    Type: {
        type: String,
        required: true
    },
    ChatId: {
        type: String,
        required: false
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

export default mongoose.model('Message', MessageSchema);