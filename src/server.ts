import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connect_DB } from "./config/db.config";
import CustomError, {
  errorHandler,
} from "./middlewares/error_handler.middleware";

import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import brandRoutes from "./routes/brand.route";
// express app instance
const PORT = process.env.PORT || 5000;
const app = express();

connect_DB();

//* middleware
app.use(express.json({ limit: "5mb" }));
app.use("/api/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is up and running ",
    status: "success",
    success: true,
  });
});

//*using routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brand", brandRoutes);

//! handling path fallback error
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const message = `Can not ${req.method}on ${req.originalUrl}`;
//   const error: any = new Error(message);
//   error.status = "fail";
//   error.statuscode = 400;
//   console.log(error);

//   next(error);
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method}on ${req.originalUrl}`;
  next(new CustomError(message, 400));
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);
