import jwt from "jsonwebtoken";
import { IPayload } from "../@types/interfce.types";
import { jwt_config } from "../config/config";
import { json } from "express";

export const generateToken = (payload: IPayload) => {
  try {
    return jwt.sign(payload, jwt_config.secret, {
      expiresIn: jwt_config.expries_in as any,
    });
  } catch (error) {
    console.log(error);
  }
};
