import { Request, Response, Express } from "express";
import { asyncHandler } from "../utils/asynchandler.utils";
import Product from "../models/product.model";
import CustomError from "../middlewares/error_handler.middleware";
import { deleteFile, upload } from "../utils/cloudinary.utils";
import Brand from "../models/brand.model";
import Category from "../models/category.model";

const dir = "/products";

//get all
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(200).json({
    data: products,
    message: "Products fetched",
    status: "success",
  });
});

// get by id
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    data: product,
    message: "Product fetched",
    status: "success",
  });
});
// create
export const create = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    category,
    brand,
    stock,
    is_featured,
    new_arrival,
  } = req.body;

  const { cover_image, images } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const product = new Product({
    name,
    price,
    description,
    is_featured,
    new_arrival,
    stock,
  });

  // await product.validate();
  //* handle product brand
  if (brand) {
    const product_brand = await Brand.findOne({ _id: brand });

    if (!product_brand) {
      throw new CustomError("Brand not found", 404);
    }
    product.brand = product_brand._id;
  }

  //* handle product category
  if (category) {
    const product_category = await Category.findOne({ _id: category });

    if (!product_category) {
      throw new CustomError("Category not found", 404);
    }
    product.category = product_category._id;
  }

  //* upload file
  if (cover_image[0]) {
    const { path, public_id } = await upload(cover_image[0].path, dir);

    product.cover_image = { path, public_id };
  }

  //* images

  if (images && images.length > 0) {
    const promises = images.map(async (image) => await upload(image.path, dir));
    const product_images = await Promise.all(promises);
    product.images = product_images as any;
  }

  await product.save();

  res.status(201).json({
    message: "Product created",
    data: product,
    status: "success",
  });
});

// update
export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    category,
    brand,
    deleted_image,
    is_featured,
    new_arrival,
    stock,
  } = req.body;

  const { cover_image, images } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  //! find peoduct by id
  const product = await Product.findOne({ _id: id });

  //! throw error if product not found
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // update body fields

  if (name) product.name = name;
  if (stock) product.stock = stock;
  if (price) {
    product.price = price;
  }
  if (description) product.description = description;
  if (is_featured) product.is_featured = is_featured;
  if (new_arrival) product.new_arrival = new_arrival;

  //* update category

  if (category) {
    const new_category = await Category.findOne({ _id: category });
    // throw error if category not found
    if (!new_category) throw new CustomError("Category not found", 404);

    product.category = new_category._id;
  }
  //* update brand

  if (brand) {
    const new_brand = await Brand.findOne({ _id: brand });

    if (!new_brand) throw new CustomError("Brand not found", 404);

    product.brand = new_brand._id;
  }

  // update cover image
  if (cover_image && cover_image.length > 0) {
    await deleteFile(product.cover_image?.public_id);

    const cover = await upload(cover_image[0].path, dir);
    product.cover_image = cover;
  }

  //* update images

  //? delete changed image
  if (
    deleted_image &&
    Array.isArray(deleted_image) &&
    deleted_image.length > 0
  ) {
    deleted_image.map(async (public_id) => await deleteFile(public_id));

    //? images after removing deleted images
    product.images = product.images?.filter(
      (img) => !deleted_image.includes(img.public_id)
    ) as any;
  }

  if (images && images.length > 0) {
    //? upload new images
    const uploaded_images = await Promise.all(
      images.map(async (img) => await upload(img.path, dir))
    );
    //? update product images
    product.images = [...uploaded_images, ...product.images] as any;
  }

  await product.save();

  res.status(201).json({
    message: "Product Updated",
    data: product,
    status: "success",
  });
});

// delete
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  await deleteFile(product.cover_image.public_id);

  if (product.images && product.images.length > 0) {
    product.images.map(async (img) => await deleteFile(img?.public_id || ""));
  }

  await product.deleteOne();

  res.status(201).json({
    message: "Product Deleted",
    data: null,
    status: "success",
  });
});

// get by category
// get featured products
// get new arrival products
