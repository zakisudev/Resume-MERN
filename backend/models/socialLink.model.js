const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialLinkSchema = new Schema(
  {
    socialLink: String,
    personalInformation: {
      type: Schema.Types.ObjectId,
      ref: 'PersonalInformation',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
