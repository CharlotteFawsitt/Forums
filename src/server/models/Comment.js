const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  name: String,
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, //Creates a relationship with the post collection
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_email: { type: mongoose.Schema.Types.String, ref: "User" }
});

module.exports = mongoose.model("Comment", CommentSchema);
