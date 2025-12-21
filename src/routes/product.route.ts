import express from "express";
import { create, getAll, getById } from "../controllers/product.controller";
import { uploadFile } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

const upload = uploadFile();

//get all
router.get("/", getAll);

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
  authenticate([Role.ADMIN]),
  create
);

// update
// router.put("/id", upload.fields({}));authenticate([Role.ADMIN]),

// delete
// router.delete("")authenticate([Role.ADMIN]),

// get by category
// router.get('/category/:category_id',getProductByCategory)

// get featured products
// router.get("/featured", getFeatured);

// get new arrival products
// router.get("/arrival",getArrival);

// get by id
router.get("/:id", getById);

export default router;
