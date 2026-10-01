const express = require("express");
const multer = require("multer");
const Certificate = require("../models/Certificate");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed")
      );
    }
  },
});

/*
|--------------------------------------------------------------------------
| GET ALL CERTIFICATES
|--------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 });

    res.status(200).json(certificates);
  } catch (error) {
    console.error("Get certificates error:", error);

    res.status(500).json({
      message: "Failed to fetch certificates",
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPLOAD CERTIFICATE
|--------------------------------------------------------------------------
*/

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      issuer,
      date,
      credentialUrl,
    } = req.body;

    // Validate fields
    if (!title || !issuer || !date) {
      return res.status(400).json({
        message: "Title, issuer and date are required",
      });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        message: "Certificate image is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Upload image to Cloudinary
    |--------------------------------------------------------------------------
    */

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio/certificates",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    /*
    |--------------------------------------------------------------------------
    | Save certificate information in MongoDB
    |--------------------------------------------------------------------------
    */

    const certificate = new Certificate({
      title,
      issuer,
      date,
      credentialUrl: credentialUrl || "",
      imageUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
    });

    await certificate.save();

    res.status(201).json({
      message: "Certificate uploaded successfully",
      certificate,
    });
  } catch (error) {
    console.error("Certificate upload error:", error);

    res.status(500).json({
      message: "Failed to upload certificate",
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE CERTIFICATE
|--------------------------------------------------------------------------
*/

router.delete("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete image from Cloudinary
    |--------------------------------------------------------------------------
    */

    if (certificate.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(
        certificate.cloudinaryPublicId
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Delete certificate from MongoDB
    |--------------------------------------------------------------------------
    */

    await Certificate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error("Delete certificate error:", error);

    res.status(500).json({
      message: "Failed to delete certificate",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found",
      })
    }

    // Delete image from Cloudinary
    if (certificate.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(
        certificate.cloudinaryPublicId
      )
    }

    // Delete certificate from MongoDB
    await Certificate.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "Certificate deleted successfully",
    })
  } catch (error) {
    console.error("Delete certificate error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to delete certificate",
    })
  }
})

module.exports = router;