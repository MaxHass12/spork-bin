require('dotenv').config();
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/spork-bin';

// const url = process.env.MONGODB_URL; // This is working

const connectMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error', error?.message);
  }
};

module.exports = {
  connectMongoDB,
};
