const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB conectado en:', process.env.MONGO_URI);
  } catch (error) {
    console.error('🔴 Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;