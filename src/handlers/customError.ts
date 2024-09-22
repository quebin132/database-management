// CustomError.ts
export class CustomError extends Error {
  status?: number; // Optional status property

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.name = "CustomError";
  }
}
