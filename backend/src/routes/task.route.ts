import express from "express";
import { taskController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const taskRouter = express.Router();

// order => GET, POST, PUT/PATCH, DELETE

taskRouter
    .get('/', isConnectedMiddleware.execute, taskController.findAll)
    .get('/:taskId', isConnectedMiddleware.execute, taskController.findById)
    .post('/', isConnectedMiddleware.execute, taskController.create)
    .patch('/:taskId', isConnectedMiddleware.execute, taskController.updateOneById)
    .delete('/:taskId', isConnectedMiddleware.execute, taskController.deleteOneById)

export default taskRouter;