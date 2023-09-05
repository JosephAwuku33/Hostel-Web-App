import jwt from "jsonwebtoken";
import User from "../data/models/User.js";
import { Request, Response } from "express";

export const protect = async (req: Request, res: Response) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

      // Get user from the token
      req.body.user = await User.findById(decoded.id).select("-password");

    } catch (err) {
        console.log(err);
        res.status(401).send("Not authorized");
    }
  }
};
