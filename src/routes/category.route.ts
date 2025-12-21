import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";
import { uploadFile } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();
const upload = uploadFile();

// get all
router.get("/", getAll);

// id
router.get("/:id", getById);

// create
router.post("/", upload.single("image"), authenticate([Role.ADMIN]), create);

router.get("/:category_id", getById);

// update
router.put("/:id", upload.single("image"), authenticate([Role.ADMIN]), update);

// delete
router.delete("/:id", authenticate([Role.ADMIN]), remove);

export default router;
