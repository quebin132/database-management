import express from "express";
import router from "./routes/userRoutes";
import connectDB from "./Config/Database";
import { Request, Response } from "express";
import { CustomError } from "./handlers/customError"; // Adjust the path as needed
import jsonErrorHandler from "./handlers/JSONErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json()); // middleware para transformar el body de la req en json
app.use(cookieParser());
connectDB();

app.use("/api", router);

app.use(jsonErrorHandler);

app.use((err: CustomError, _req: Request, res: Response) => {
  console.error(err.stack);

  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong!" });
});

export default app;
