import { Router } from "express";
import { registerUser, logUser } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", logUser);

export default router;
