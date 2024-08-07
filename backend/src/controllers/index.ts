import { AuthController } from './auth.controller'
import { TaskController } from './task.controller'

const taskController = new TaskController()
const authController = new AuthController()

export {
    authController,
    taskController
}