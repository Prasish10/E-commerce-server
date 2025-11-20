import express from "express";
import { create, getAll, getById } from "../controllers/product.controller";
import { uploadFile } from "../middlewares/multer.middleware";

const router = express.Router();

const upload = uploadFile();

//get all
router.get("/", getAll);
// get by id
router.get("/:id", getById);
// create
router.post(
  "/",
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 6,
    },
  ]),
  create
);
// update
// delete
// get by category
// get featured products
// get new arrival products

export default router;
