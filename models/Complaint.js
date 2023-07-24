import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ComplaintSchema = new Schema({
    UserId: {
        type: String,
        require: true
    },
    PostId: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    Time: {
        type: String,
        require: true
    },
});

export default mongoose.model('Complaint', ComplaintSchema);