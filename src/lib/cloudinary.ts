import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY,
  api_secret:
    process.env.CLOUDINARY_API_SECRET ||
    process.env.API_SECRET ||
    process.env.CLOUDINARY_API_SECRET_KEY,
});

export default cloudinary;
