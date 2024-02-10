import { Response } from "express";
import jwt from "jsonwebtoken";

const refreshToken = (res: Response, id: any) => {
  const newToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_LONG_EXPIRATION,
  });

  return newToken;
};

export default refreshToken;
