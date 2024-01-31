const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://i.imguhttps://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpgr.com/8uXp4fB.png',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Me', meSchema);
