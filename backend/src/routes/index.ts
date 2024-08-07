import express from 'express';
import authRouter from './auth.route';
import taskRouter from './task.route';

const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/tasks', taskRouter)

export default appRouter;

