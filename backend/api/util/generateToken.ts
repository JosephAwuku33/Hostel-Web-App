import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (res: Response, id: any) => {
    const token =  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return token;
}

export default generateToken;