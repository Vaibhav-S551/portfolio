const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a certificate title'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer name is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'An image or badge is required'],
    },
    date: {
      type: Date,
      required: true,
    },
    credentialUrl: {
      type: String,
      default: '#',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Certificate', certificateSchema);