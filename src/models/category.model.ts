// name, description, image(voli)
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "product name is required"],
    },
    detail: {
      type: String,
      required: [true, "product details is required"],
    },
    price: {
      type: String,
      required: [true, "price is required"],
      minLength: 6,
    },
    product_image: {
      type: {
        path: String,
        public_id: String,
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
