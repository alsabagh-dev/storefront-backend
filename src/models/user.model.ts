import client from '../database/pool.db';
import hash from '../utls/hash.utl';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    user_name: string;
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
            const hashed_pass = hash(user.password as string);

            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'INSERT INTO users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *';
            // excute the query
            const result = await connection.query(query, [user.first_name, user.last_name, user.user_name ,hashed_pass]);
            // end connection
            connection.release();
            console.log(result);
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`can not create new user ${user.first_name}. Error: ${error}`);
        }
    }

    async edit(user: User): Promise<User> {
        // Will not change password. passowrd change will be seperate method.
        // Will not change userName. no-way to change username.
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'update users SET first_name=($2), last_name=($3) WHERE id=($1) RETURNING *';
            // excute the query
            const result = await connection.query(query, [user.id, user.first_name, user.last_name]);
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
