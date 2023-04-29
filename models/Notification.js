import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    PostId: {
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

export default mongoose.model('Notification', NotificationSchema);