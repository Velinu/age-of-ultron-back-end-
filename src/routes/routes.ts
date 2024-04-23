import { Router } from 'express'
import userController from '../controllers/user.controller'
import authController from '../controllers/auth.controller';
import eventController from '../controllers/event.controller'
import { authMiddleware } from '../middlewares/auth.middleware';
import creatorController from '../controllers/creator.controller';
import storieController from '../controllers/storie.controller';

const routes = Router();

routes.post('/user/create', userController.create);
routes.post('/auth/login', authController.signIn);
routes.get('/auth/renewtoken', authController.renewToken);

routes.get('/events/create/:event', eventController.create);
routes.post('/events/createcreators', creatorController.create);
routes.get('/stories/create/:event', storieController.create)

export {
    routes
}