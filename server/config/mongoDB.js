const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected!')
      } catch (error) {
        console.error('MongoDB connection error', error?.message);
      }
};