import express from 'express';
import UserController from '../controller/user.controller';
import auth from '../middelware/auth.middleware';

const user_controller = new UserController();
const user_router = express.Router();

user_router.use(auth.verify_middelware);

user_router
    .get('/', user_controller.getUsers)
    .get('/:id', user_controller.get_user)
    .post('/', user_controller.add_user);

export default user_router;
