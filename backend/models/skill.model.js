const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema(
  {
    skill: String,
    type: String,
    personalInformation: {
      type: Schema.Types.ObjectId,
      ref: 'PersonalInformation',
    },
  },
  {
    timestamps: true,
  }
);
