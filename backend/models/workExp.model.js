const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workExperienceSchema = new Schema(
  {
    work: [
      {
        companyName: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
        city: String,
        state: String,
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

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
