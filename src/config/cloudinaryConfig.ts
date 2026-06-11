import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import serverConfig from "./serverConfig";

cloudinary.config({
  cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME,
  api_key: serverConfig.CLOUDINARY_API_KEY,
  api_secret: serverConfig.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (_req, file) => ({
    folder: "foodcoma_products",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: `${Date.now()}-${
      file.originalname.split(".")[0]
    }`,
  }),
});

const upload = multer({ storage });

export default upload;
export { cloudinary };