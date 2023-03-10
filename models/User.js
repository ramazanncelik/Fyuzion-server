import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Email:{
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
    Biography:{
        type: String,
        required: false
    },
    Website: {
        type: String,
        required: false
    },
    EmailVerify:{
        type: Boolean,
        required: false
    },
    OnlineStatus: {
        type: Boolean,
        required: false
    },
    Follower: {
        type: Number,
        required: false
    },
    MyFollowed: {
        type: Number,
        required: false
    }
});

export default mongoose.model('User', UserSchema);