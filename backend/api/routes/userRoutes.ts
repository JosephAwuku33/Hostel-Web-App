import express from 'express';
import { getMe, registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();
userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/me', protect, getMe);


export default userRouter;