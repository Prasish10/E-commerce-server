import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
  status: "error" | "fail";
  statuscode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statuscode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, CustomError);
  }
}
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = error.statuscode || 500;
  const message = error?.message || "internal sever error";
  const status = error?.status || "error";
  res.status(statuscode).json({
    message,
    success: false,
    status,
    originError: error?.stack,
  });
};

export default CustomError;
