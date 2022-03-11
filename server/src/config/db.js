const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI);
    
        console.log(`MongoDB connected successfully: ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;