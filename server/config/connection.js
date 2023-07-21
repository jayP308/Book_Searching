// connection.js

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI);

module.exports = mongoose.connection;
