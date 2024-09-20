import express from "express";
import router from "./routes/userRoutes";
import connectDB from "./Config/Database";

const app = express();

app.use(express.json()); // middleware para transformar el body de la req en json

connectDB();

app.use("/api", router);

export default app;
