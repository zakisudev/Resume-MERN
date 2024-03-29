const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema(
  {
    Educations: [
      {
        schoolName: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        startYear: {
          type: String,
          required: true,
        },
        endYear: {
          type: String,
          required: true,
        },
        description: String,
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

module.exports = mongoose.model('Education', educationSchema);
