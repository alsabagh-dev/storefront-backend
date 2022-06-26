import { Request, Response } from 'express';
import { User, UserStore } from '../models/user.model';

const store = new UserStore();

export default class UserController {
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await store.index()
            res.json(users);
        } catch (error) {
            console.error(error);

            res.status(500);
            res.send(`Sorry can not get users, please try again later
            ${error}`);
        }
    }

    async get_user(req: Request, res: Response): Promise<void> {
        const user_id = req.params.id;
        try {
            const user = await store.show(user_id);
            if(!user) throw new Error('not found');
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(404);
            res.send(`Sorry can not find user ${user_id}
            ${error}`);
        }
    }

    // @TODO return token
    async add_user(req: Request, res: Response): Promise<void> {
        const {
            first_name,
            last_name,
            user_name,
            password
        } = req.body;

        if (first_name === undefined || user_name === undefined
            || last_name === undefined || password === undefined) {
            res.status(400);
            res.send(`missing field(s) user must have 'first_name', 'last_name',
             'user_name', and password`);
        } else {
            const new_user: User = {
                first_name,
                last_name,
                user_name,
                password
            }
            try {
                const user = await store.create(new_user);
                res.json(user);
            } catch (error) {
                console.error(error);

                res.status(500);
                res.send(`Sorry can not create users, please try again later
                ${error}`);
            }
        }
    }

     // @Todo : update and delete. (done in model. )
}
