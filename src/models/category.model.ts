// name, description, image(voli)
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    description: {
      type: String,
      required: [true, "product details is required"],
    },
    // price: {
    //   type: String,
    //   required: [true, "price is required"],
    //   minLength: 6,
    // },
    image: {
      type: {
        path: String,
        public_id: String,
      },
      required: [true, "image is required"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
