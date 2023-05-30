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
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
});

export default mongoose.model('Notification', NotificationSchema);