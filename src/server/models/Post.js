const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String,
  forum_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Forum'},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user_email: {type: mongoose.Schema.Types.String, ref: 'User'}
});

module.exports = mongoose.model('Post', PostSchema);
