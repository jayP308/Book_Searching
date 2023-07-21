const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

module.exports = mongoose.connection;
