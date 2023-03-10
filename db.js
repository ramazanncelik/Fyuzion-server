import mongoose from 'mongoose';

const db = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('open', () => console.log("MongoDB: Connected"));
    mongoose.connection.on('err', (e) => console.log("MongoDB: Not Connected", e));
};
export default db;