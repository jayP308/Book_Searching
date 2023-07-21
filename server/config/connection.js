// connection.js

const mongoose = require('mongoose');

const dbURI = MONGODB_URI;
mongoose.connect(dbURI, {
  useNewUrlParser: false,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
