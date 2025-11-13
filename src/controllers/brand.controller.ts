import CustomError from "../middlewares/error_handler.middleware";
import Brand from "../models/brand.model";
import { asyncHandler } from "../utils/asynchandler.utils";
import { Request, Response } from "express";
import { deleteFile, upload } from "../utils/cloudinary.utils";

const dir = "/brand";
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const brand = await Brand.find({});

  res.status(200).json({
    message: "brand fetched",
    status: "success",
    data: brand,
  });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await Brand.findOne({ _id: id });

  if (!brand) {
    throw new CustomError("brand not found", 404);
  }
  res.status(200).json({
    message: "brand fetched",
    status: "success",
    data: brand,
  });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const file = req.file;

  if (!file) {
    throw new CustomError("image is required", 400);
  }
  const brand = new Brand({ name, description });
  const { path, public_id } = await upload(file.path, dir);

  brand.image = {
    path,
    public_id,
  };
  brand.save();

  res.status(200).json({
    message: "brand created",
    status: "success",
    data: brand,
  });
});
export const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const file = req.file;

  const brand = await Brand.findOne({ _id: id });
  if (!brand) {
    throw new CustomError("brand not found", 404);
  }
  if (name) {
    brand.name = name;
  }
  if (description) {
    brand.description = description;
  }
  if (file) {
    if (brand.image) {
      // delete old image
      await deleteFile(brand.image?.public_id as string);
    }
    // upload new image
    const { path, public_id } = await upload(file.path, dir);

    brand.image = {
      path,
      public_id,
    };
  }
  await brand.save();

  res.status(201).json({
    message: "brand updated",
    status: "success",
    data: brand,
  });
});
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    throw new CustomError("brand not found", 404);
  }
  if (brand.image) {
    await deleteFile(brand.image.public_id as string);
  }
  await brand.deleteOne();

  res.status(200).json({
    message: "brand deleted successfully",
    status: "success",
    data: null,
  });
});
