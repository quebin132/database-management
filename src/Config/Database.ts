import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
console.log(
  process.env.DB_DATABASE,
  process.env.DB_PASSWORD,
  process.env.DB_USER,
  process.env.DB_HOST
);
const puerto = process.env.PORT;
const port = Number(puerto) || 3306;

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql", // or 'postgres' for PostgreSQL
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  host: process.env.DB_HOST,
  port: port,
  models: [__dirname + "/../models"], // Path to your models
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
