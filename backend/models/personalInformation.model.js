const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalInformationSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'PersonalInformation',
  personalInformationSchema
);
