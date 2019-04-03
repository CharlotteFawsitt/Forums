const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String,
  forum_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}
});

module.exports = mongoose.model('Post', PostSchema);
