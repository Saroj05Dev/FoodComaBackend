const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary with env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // ensures https URLs
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "foodcoma_products", // folder name in Cloudinary
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // unique file name
    };
  },
});

// Multer middleware
const upload = multer({ storage });

module.exports = upload;
