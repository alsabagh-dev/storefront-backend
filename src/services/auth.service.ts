import client from '../database/pool.db'
import { User, UserStore } from '../models/user.model'
import bcrypt from 'bcrypt';
import config from '../environment.conf';

const authenticate = async (username: string, password: string): Promise<User | null> => {
    try {
        const store = new UserStore();
        const user = await store.show_by_user_name(username);

        if (user &&
            bcrypt.compareSync(password + (config.bcrypt_password as string), user.password as string)
        ) {
            return user;
        }
    } catch (error) {
        throw new Error(`can not authenticate user:${username}. Error: ${error}`);
    }
    return null;
}

export default authenticate;