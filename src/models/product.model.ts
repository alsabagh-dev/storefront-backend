import client from '../database/pool.db';

export type Product = {
    id?: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'SELECT * FROM products';
            // excute the query
            const result = await connection.query(query);
            // end connection
            connection.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Can not get products. Error: ${error}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'SELECT * FROM products WHERE id=($1)';
            // excute the query
            const result = await connection.query(query, [id]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not get product ${id}. Error: ${error}`);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'INSERT INTO products (name, price) VALUES($1, $2) returning *';
            // excute the query
            const result = await connection.query(query, [product.name, product.price]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not create new product ${product.name}. Error: ${error}`);
        }
    }

    async edit(product: Product): Promise<Product> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'update products SET name=($2), price=($3) WHERE id=($1)';
            // excute the query
            const result = await connection.query(query, [product.id, product.name, product.price]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not update product ${product.id}. Error: ${error}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            const query = 'DELETE FROM products WHERE id=($1)';
            // excute the query
            const result = await connection.query(query, [id]);
            // end connection
            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`can not delete product ${id}. Error: ${error}`);
        }
    }

}
