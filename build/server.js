"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_config_js_1 = require("./config/db.config.js");
// express app instance
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_config_js_1.connect_DB)();
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
