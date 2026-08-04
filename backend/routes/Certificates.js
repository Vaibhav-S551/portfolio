const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

console.log("UPLOAD =", upload);
console.log("TYPE =", typeof upload);

if (upload) {
  console.log("KEYS =", Object.keys(upload));
  console.log("SINGLE =", upload.single);
}

const uploadToCloudinary = require('../utils/cloudinaryUpload');
const Certificate = require('../models/Certificate');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, date, credentialUrl } = req.body;

    if (!title || !issuer || !date) {
      return res.status(400).json({
        success: false,
        message: 'title, issuer and date are required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Certificate image is required',
      });
    }

    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    const certificate = await Certificate.create({
      title,
      issuer,
      date,
      credentialUrl,
      imageUrl: uploadedImage.secure_url,
    });

    res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;