const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    project: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        technologies: {
          type: [String],
          required: true,
        },
        image: {
          type: String,
          default:
            'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        },
        link: String,
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

module.exports = mongoose.model('Project', projectSchema);
