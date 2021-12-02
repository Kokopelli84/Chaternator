const mongoose = require('mongoose');

async function connectDB () {
  try {
    await mongoose.connect('mongodb://localhost:27017/cw-messages');
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to Mongo', error);
  }
}

module.exports = {
  connectDB
};