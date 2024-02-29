/**
 * Controller functions for registering a user, signing in a user basically
 */

import User from "../data/models/User.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../util/generateToken.js";
import refreshToken from "../util/refreshToken.js";

// @desc    Register new user
// @route   POST /users/signup
// @access  Public
const registerUser = async (req: Request, res: Response) => {
  try {
    //retrieve the input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!first_name || !last_name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // check if user already exists
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Generate a new access token and send the response
      const accessToken = generateToken(res, user._id);

      // Generate a new refresh token
      const refresh_token = refreshToken(res, user._id);
      
       // Set the new token in the response
       res.cookie("jwt", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        accessToken
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.send(`E make beans: ${err}`);
  }
};

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password!))) {
     

      // Generate a new access token and send the response
      const accessToken = generateToken(res, user._id);

      // Generate a new refresh token
      const refresh_token = refreshToken(res, user._id);

      // Set the new token in the response
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        accessToken
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
};

// @desc    Refresh acccess token
// @route   GET /users/refresh
// @acess   Public
const refresh = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized access" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err: any, decoded: any) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findById(decoded.id);

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = generateToken(res, foundUser._id);

      res.json({ accessToken });
    }
  );
};

// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = (req: Request, res: Response) => {
  res.status(200).json(req.body.user);
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req: Request, res: Response) => {
  
  if ( !req.cookies?.jwt ) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true })
  res.json({ message: "Cookie cleared Succesfully"});
};

export { registerUser, loginUser, logoutUser, getMe, refresh };
