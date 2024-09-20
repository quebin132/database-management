import { Request, Response } from "express";
import { register, login } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  console.log("entering controller");
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const logUser = async (req: Request, res: Response) => {
  console.log("entering controller");
  try {
    console.log(req.body);
    const users = await login(req.body);
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
