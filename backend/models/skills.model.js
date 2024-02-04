const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema(
  {
    Languages: [
      {
        skill: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          // enum: ['frontend', 'backend', 'database', 'other'],
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

module.exports = mongoose.model('Skill', skillsSchema);
