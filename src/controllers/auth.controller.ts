import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

//? register user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email, password, phone } = req.body;

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      phone,
    });

    res.status(201).json({
      message: "Account created",
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
