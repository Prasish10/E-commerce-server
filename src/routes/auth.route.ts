import express from "express";
import { login, register } from "../controllers/auth.controller";
import { uploadFile } from "../middlewares/multer.middleware";

// creating multer instance

const router = express.Router();
const upload = uploadFile();

router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);
export default router;
