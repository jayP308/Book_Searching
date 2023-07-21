// connection.js

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});