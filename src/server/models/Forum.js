const mongoose = require("mongoose");

const ForumSchema = mongoose.Schema({
  name: String,
  image: String
});

module.exports = mongoose.model("Forum", ForumSchema);
