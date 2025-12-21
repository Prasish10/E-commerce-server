import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/brand.controller";
import { uploadFile } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = uploadFile();

// get all
router.get("/", getAll);

// create
router.post("/", upload.single("image"), authenticate([Role.ADMIN]), create);

// id
router.get("/:id", getById);

// update
router.put("/:id", upload.single("image"), authenticate([Role.ADMIN]), update);

// delete
router.delete("/:id", authenticate([Role.ADMIN]), remove);

export default router;
