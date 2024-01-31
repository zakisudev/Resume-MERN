const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workExperienceSchema = new Schema(
  {
    companyName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    city: String,
    state: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
