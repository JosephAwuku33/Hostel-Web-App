import express, { Request, Response } from "express";
import {
  getMe,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { rateLimiter } from "../middleware/rateLimiterMiddleware.js";
// import passport from "passport";
import passportSetup from "../passport/index.js";
import { configureGoogleStrategy } from "../passport/googleStrategy.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get(
  "/google",
  (req: Request, res: Response, next) => {
    // Pass the response object to the configureGoogleStrategy function
    configureGoogleStrategy(passportSetup);
    next();
  },
  passportSetup.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
userRouter.get(
  "/google/callback",
  passportSetup.authenticate("google", {
    successRedirect: "/users/profileTest",
    failureRedirect: "/login",
  })
  
);
userRouter.post("/logout", logoutUser);

userRouter.get("/profileTest", (req: Request, res: Response) => {
  res.send("Hello you're logged in");
});
userRouter.get("/me", protect, getMe);

export default userRouter;
