import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ConnectionSchema = new Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
});

export default mongoose.model('connection', ConnectionSchema);