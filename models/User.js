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
    Name: {
        type: String,
        required: false
    },
    PhoneNumber: {
        type: String,
        required: false
    },
    Biography: {
        type: String,
        required: false
    },
    Website: {
        type: String,
        required: false
    },
    Follower: {
        type: Number,
        required: true
    },
    MyFollowed: {
        type: Number,
        required: true
    },
    ConfirmationCode: {
        type: String,
        required: true
    },
    IsPrivate: {
        type: Boolean,
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
    UsageAgreement: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('User', UserSchema);