import { NextFunction, Request, Response } from "express";
import CustomError from "./error_handler.middleware";
import { decodeToken } from "../utils/jwt.utils";
import User from "../models/user.model";

export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookie = req.cookies ?? {};
      const token = cookie["access_token"];
      console.log(token);

      if (!token) {
        throw new CustomError("Unauthorized. access denied", 401);
      }
      const decodedData = decodeToken(token);
      console.log(decodedData);
      if (!decodedData) {
        throw new CustomError("Unauthorized. access denied", 401);
      }

      // check for expiry
      if (decodedData?.exp && decodedData?.exp * 1000 < Date.now()) {
        res.clearCookie("access_token", {
          sameSite: "none",
          httpOnly: true,
          secure: process.env.NODE_ENV === "development" ? false : true,
          maxAge: Date.now(),
        });
        throw new CustomError("Unauthorized. access denied", 401);
      }
      //find user
      const user = await User.findOne({
        _id: decodedData._id,
        email: decodedData?.email,
      });
      if (!user) {
        res.clearCookie("access_token", {
          sameSite: "none",
          httpOnly: true,
          secure: process.env.NODE_ENV === "development" ? false : true,
          maxAge: Date.now(),
        });
        throw new CustomError("Unauthorized. access denied", 401);
      }
      next(); // sab thik xa vanne xordine
    } catch (error) {
      next(error);
    }
  };
};
