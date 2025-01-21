const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/spork-bin';

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