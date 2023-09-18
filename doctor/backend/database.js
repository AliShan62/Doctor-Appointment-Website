const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected with server: ${mongoose.connection.host}`.yellow);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  // Set up a global error handler for duplicate key errors
  mongoose.connection.on('error', (err) => {
    if (err.code === 11000) { // E11000 is the error code for duplicate key violation
      console.error("Duplicate key error:", err.message);
      alert("Kindly! Avoid From Duplication Of Data ")
    }
  });
};

module.exports = connectDatabase;
