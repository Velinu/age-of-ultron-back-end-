import { Router } from 'express'
import userController from '../controllers/user.controller'
import authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const routes = Router();

routes.post('/user/create', userController.create);
routes.post('/auth/login', authController.signIn);
routes.get('/auth/renewtoken', authController.renewToken);

export {
    routes
}