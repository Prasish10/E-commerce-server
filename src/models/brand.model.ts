import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
    },
    description: {
      type: String,
      required: [true, "brand description is required"],
    },
    image: {
      type: {
        path: String,
        public_id: String,
      },
      required: [true, "brand image is required"],
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("brand", brandSchema);
export default Brand;
