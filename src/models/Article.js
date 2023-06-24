const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const articleSchema = mongoose.Schema(
  {
    name: { type: String, maxLength: 255 },
    desc: { type: String },
    imgPath: { type: String },
    sourceLink: { type: String },
    previewLik: { type: String },
    slug: { type: String, slug: 'name' },
  },
  {
    timestamp: true,
  }
);

module.exports = new mongoose.model('Article', articleSchema);
