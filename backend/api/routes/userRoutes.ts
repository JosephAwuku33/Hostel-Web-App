import express, { Request, Response } from "express";
import {
  getMe,
  registerUser,
  loginUser,
  logoutUser,
  refresh,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { rateLimiter } from "../middleware/rateLimiterMiddleware.js";


const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refresh);
userRouter.post("/logout", logoutUser);

userRouter.get("/me", protect, getMe);

export default userRouter;
