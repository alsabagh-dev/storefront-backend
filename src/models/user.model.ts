import client from '../database/pool.db';
import bcrypt from 'bcrypt';
import config  from '../environment.conf';


export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    password?: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'SELECT * FROM users';
            // excute the query
            const result = await connection.query(query);
            // end connection
            connection.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Can not get user. Error: ${error}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'SELECT * FROM users WHERE id=($1)';
            // excute the query
            const result = await connection.query(query, [id]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not get user ${id}. Error: ${error}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            // Password hasing
            const hash = bcrypt.hashSync(
                user.password+(config.bcrypt_password as string),
                parseInt(config.bcrypt_password as string)
            );

            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            // excute the query
            const result = await connection.query(query, [user.firstName, user.lastName, user.userName ,hash]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not create new user ${user.firstName}. Error: ${error}`);
        }
    }

    async edit(user: User): Promise<User> {
        // Will not change password. passowrd change will be seperate method.
        // Will not change userName. no-way to change username.
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'update users SET firstName=($2), lastName=($3) WHERE id=($1) RETURNING *';
            // excute the query
            const result = await connection.query(query, [user.id, user.firstName, user.lastName]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not update user ${user.id}. Error: ${error}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'DELETE FROM user WHERE id=($1) RETURNING *';
            // excute the query
            const result = await connection.query(query, [id]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not delete user ${id}. Error: ${error}`);
        }
    }

}
