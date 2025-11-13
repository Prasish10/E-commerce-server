import e from "express";
import cloudinary from "../config/cloudinary.config";
import CustomError from "../middlewares/error_handler.middleware";
import fs from "fs";

export const upload = async (file: string, dir: string = "/") => {
  try {
    const folder = "/js_ecommerce" + dir;
    const { public_id, secure_url } = await cloudinary.uploader.upload(file, {
      folder,
      unique_filename: true,
    });
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    return {
      public_id,
      path: secure_url,
    };
  } catch (error) {
    console.log(error);
    throw new CustomError("File upload error", 500);
  }
};

export const deleteFile = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw new CustomError("File delete error", 500);
  }
};
