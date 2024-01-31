const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialLinkSchema = new Schema(
  {
    name: String,
    socialLink: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
