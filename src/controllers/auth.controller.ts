import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

//? register user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    if (!password) {
      const error: any = new Error("password is required");
      error.statusCode = 400;
      throw error;
    }
    const user = new User({
      first_name,
      last_name,
      email,
      phone,
    });
    const hashPass = await hashPassword(password);
    user.password = hashPass;

    //! image

    //! save user
    await user.save();

    res.status(201).json({
      message: "Account created",
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//! login

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      const error: any = new Error("email is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }
    if (!password) {
      const error: any = new Error("pass is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    //! check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      const error: any = new Error("email or pass does not match");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }
    //! compare password
    const isPassMatch = await comparePassword(password, user?.password || "");

    if (!isPassMatch) {
      const error: any = new Error("email or pass does not match");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }
    //! generate jwt token

    res.status(201).json({
      message: "login sucessful",
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
