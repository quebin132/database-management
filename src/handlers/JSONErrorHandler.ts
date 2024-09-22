// jsonErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError"; // Adjust the path as needed

const jsonErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Check if the error is a SyntaxError from JSON parsing
  if (err instanceof SyntaxError && "body" in err) {
    const customError = new CustomError("Invalid JSON: " + err.message, 400);
    return res.status(customError.status!).json({ error: customError.message });
  }
  // Pass other errors to the next middleware
  next(err);
};

export default jsonErrorHandler;
