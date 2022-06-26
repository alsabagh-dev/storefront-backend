import express from 'express';
import UserController from '../controller/user.controller';
import auth from '../middelware/auth.middleware';

const user_controller = new UserController();
const user_router = express.Router();


user_router
    .get('/', auth.verify_middelware, user_controller.getUsers)
    .get('/:id', auth.verify_middelware, user_controller.get_user)
    .post('/', user_controller.add_user);

export default user_router;
