import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    NickName: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    Biography: {
        type: String,
        required: true
    },
    Website: {
        type: String,
        required: true
    },
    EmailVerify: {
        type: Boolean,
        required: true
    },
    OnlineStatus: {
        type: Boolean,
        required: true
    },
    Follower: {
        type: Number,
        required: true
    },
    MyFollowed: {
        type: Number,
        required: true
    }
});

export default mongoose.model('User', UserSchema);