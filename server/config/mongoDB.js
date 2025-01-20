const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;

const connectMongoDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected!')
    } catch (error) {
        console.error('MongoDB connection error', error?.message);
    }
};

module.exports = {
  connectMongoDB,
};