const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialLinkSchema = new Schema(
  {
    SocialLink: [
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
