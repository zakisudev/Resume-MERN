const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema(
  {
    summary: String,
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

module.exports = mongoose.model('Summary', summarySchema);
