import { Response } from "express";
import jwt from "jsonwebtoken";

const refreshToken = (res: Response, id: any) => {
  const newToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  // Set the new token in the response
  res.cookie("jwt", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default refreshToken;
