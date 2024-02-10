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
import passportSetup from "../passport/index.js";
import { configureGoogleStrategy } from "../passport/googleStrategy.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refresh);
userRouter.post("/logout", logoutUser);


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
    successRedirect: "/users/success",
    failureRedirect: "/",
  })
);


userRouter.get("/success", (req: Request, res: Response) => {
    if (req.user) {
      /*
      const redirectUrl = 'http://localhost:5173/dashboard'; // Replace with your actual client-side route
      // Redirect to the client-side URL
      res.redirect(redirectUrl);
      */
      res.status(200).json({
        success: true,
        message: "Succesfully entered with Google",
        user: req.user,
      });
      
    }
});

userRouter.get("/profileTest", (req: Request, res: Response) => {
  res.send("Hello you're logged in");
});
userRouter.get("/me", protect, getMe);

export default userRouter;
