// connection.js

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://junnelpadilla307:@Junnelroque308@cluster0.swo0eoh.mongodb.net/googlebooks?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
