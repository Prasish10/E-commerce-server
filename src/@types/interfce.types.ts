import mongoose, { mongo, Mongoose } from "mongoose";
import { Role } from "../@types/enum.types";

export interface IPayload {
  _id: mongoose.Types.ObjectId;
  role: Role;
  email: string;
  first_name: string;
  last_name: string;
}
