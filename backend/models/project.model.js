const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    technologies: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      default: 'https://chadwindeysel.co.za/img/placeholder.png',
    },
    link: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
