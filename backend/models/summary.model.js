const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema(
  {
    summary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Summary', summarySchema);
