
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  video: { type: String },
});

const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;
