const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema(
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillsSchema);
