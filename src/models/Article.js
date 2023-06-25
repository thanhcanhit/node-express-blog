const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Article = new Schema(
  {
    name: { type: String, maxLength: 255 },
    desc: { type: String },
    imgPath: { type: String },
    sourceLink: { type: String },
    previewLink: { type: String },
    tag: [{ type: String }],
    slug: { type: String, slug: 'name' },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', Article);
