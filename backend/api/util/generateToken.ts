import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (res: Response, id: any) => {
    const token =  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.cookie('jwt', token, {
      httpOnly : true ,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;