import Category from "../models/category.model";
import { asyncHandler } from "../utils/asynchandler.utils";
import { Request, Response } from "express";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({});

  res.status(200).json({
    message: "category fetched",
    status: "success",
    data: categories,
  });
});
