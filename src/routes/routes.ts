import { Router } from 'express'
import userController from '../controllers/user.controller'
import authController from '../controllers/auth.controller';
import categoryController from '../controllers/example.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import taskController from '../controllers/task.controller';

const routes = Router();

export {
    routes
}