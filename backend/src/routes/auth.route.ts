import express from 'express';
import { authController } from '../controllers';
import { isConnectedMiddleware } from '../middlewares';

const authRouter = express.Router();


authRouter
    .get('/check-token', isConnectedMiddleware.execute, authController.checkToken)
    .post('/register', authController.register)
    .post('/login', authController.login)
     


export default authRouter;

