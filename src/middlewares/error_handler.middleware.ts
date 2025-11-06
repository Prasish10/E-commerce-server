import { NextFunction, Request, Response } from "express";

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
