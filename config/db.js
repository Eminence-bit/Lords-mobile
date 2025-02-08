const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prajyothnani123:prajyothnani123@mydatabase.ndjzos2.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=MyDatabase');
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));
module.exports = mongoose;
