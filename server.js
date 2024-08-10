import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

// MongoDB connect
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

import morgan from "morgan";
if (process.env.NODE_ENV !== "production") {
  //dev environment
  app.use(morgan("dev"));
}

// middlewares
import cors from "cors";
app.use(express.json());
app.use(cors());

// Routers
import userRouter from "./src/routers/users.js";
import transactionRouter from "./src/routers/transactions.js";

// User
app.use("/api/v1/users", userRouter);
//Transaction
app.use("/api/v1/transactions", transactionRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server runing at http://localhost:${PORT}`);
});
