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
    const result = await login(req.body);

    // Check if result is a string (error case)
    if (typeof result === "string") {
      return res.status(401).json({ message: result });
    }

    // If result is of type `loginResponse`, destructure `user` and `token`
    const { user, token } = result;
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // Expires in 15 minutes
    });
    return res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Problema en el servidor" });
    }
  }
};
