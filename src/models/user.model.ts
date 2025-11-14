import mongoose from "mongoose";
import { Role } from "../@types/enum.types";

//? users schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_nameis required"],
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "user already exists with provided email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 6,
    },
    role: {
      type: String,
      enum: Object.values(Role), //=>["USER","ADMIN"]same thing
      default: Role.USER,
    },
    profile_image: {
      type: {
        path: String,
        public_id: String,
      },
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

//? user model

const User = mongoose.model("user", userSchema);
export default User;
