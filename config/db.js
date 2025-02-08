const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI ;
mongoose.connect(dbURI);
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));
module.exports = mongoose;
