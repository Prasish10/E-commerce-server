import "dotenv/config";
import express from "express";
import { connect_DB } from "./config/db.config.js";

// express app instance
const PORT = process.env.PORT || 5000;
const app = express();

connect_DB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running ",
    status: "success",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
