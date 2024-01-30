const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema(
  {
    schoolName: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Education', educationSchema);
