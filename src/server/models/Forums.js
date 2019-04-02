const mongoose = require('mongoose');

const ForumSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Forums', ForumSchema);
