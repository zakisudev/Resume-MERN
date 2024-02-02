const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialLinkSchema = new Schema(
  {
    socialLink: [
      {
        socialName: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
