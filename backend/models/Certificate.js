const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    credentialUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Certificate", certificateSchema);