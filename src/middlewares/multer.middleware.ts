import multer from "multer";
import fs from "fs";
import path from "path";
import CustomError from "./error_handler.middleware";
import { Request } from "express";

export const uploadFile = () => {
  const folder = "uploads";
  const file_size = 5 * 1024 * 1024;
  const allowed_ext = ["jpg", "jpeg", "png", "webp", "svg"];

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "-" + file.originalname;
      cb(null, filename);
    },
  });

  const file_filter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).replace(".", "");
    const isAllowed = allowed_ext.includes(ext);
    if (isAllowed) {
      cb(null, true);
    } else {
      const message = `${ext} is not allowed.only ${allowed_ext.join(
        "."
      )}are allowed`;
      cb(new CustomError(message, 422));
    }
  };
  const upload = multer({
    storage: mystorage,
    limits: { fileSize: file_size },
    fileFilter: file_filter,
  });
  return upload;
};
