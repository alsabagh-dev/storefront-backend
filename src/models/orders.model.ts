import client from '../database/pool.db';
import { Product, ProductStore } from './product.model';
import { User } from './user.model';



export type Order = {
    id?: number;
    status: boolean;  // false = active, true == completed
    user_id: string;
    products: Product[];
    quantites: number[];
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const orders: Order[] = [];
            const productStore = new ProductStore();
            // get connection
            const connection = await client.connect();
            // Get orders
            // setup query
            let query = 'Select * from orders';
            // excute the query
            const rows = (await connection.query(query)).rows;
            for (const row of rows) {
                const order: Order = {
                    id: row.id,
                    user_id: row.user_id,
                    status: row.status,
                    products: [],
                    quantites: []
                }
                // Get Products and quantites
                query = `Select quantity, product_id from orders inner join order_products
                on orders.id = order_products.order_id where order_id = $1 ;`;
                const results = (await connection.query(query, [order.id])).rows;
                for (const result of results) {
                    order.quantites.push(parseInt(result.quantity));
                    order.products.push(await productStore.show(result.product_id));
                }
                orders.push(order);
            }

            // end connection
            connection.release();

            return orders;
        } catch (error) {
            throw new Error(`Can not get orders. Error: ${error}`);
        }
    }

    async show(id: string): Promise<Order | null> {
        try {
            const productStore = new ProductStore();
            // get connection
            const connection = await client.connect();
            // Get orders
            // setup query
            let query = 'Select * from orders where id = $1';
            // excute the query
            const result_order = (await connection.query(query, [id])).rows[0];
            if (! result_order) return null;

            const order: Order = {
                id: result_order.id,
                user_id: result_order.user_id,
                status: result_order.status,
                products: [],
                quantites: []
            }
            // Get Products and quantites
            query = `Select * from orders inner join order_products
            on orders.id = order_products.order_id where order_id = $1`;
            const results = (await connection.query(query, [order.id])).rows;
            for (const result of results) {
                order.quantites.push(parseInt(result.quantity));
                order.products.push(await productStore.show(result.product_id));
            }

            // end connection
            connection.release();

            return order;
        } catch (error) {
            throw new Error(`can not get order ${id}. Error: ${error}`);
        }
    }
 
    async show_by_user(user_id: string): Promise<Order[]> {
        try {
            const productStore = new ProductStore();
            const orders: Order[] = [];
            // get connection
            const connection = await client.connect();
            // Get orders
            // setup query
            let query = 'Select * from orders where user_id = $1';
            // excute the query
            const result_orders =  (await connection.query(query, [user_id])).rows;
            for (const result_order of result_orders) {
                const order: Order = {
                    id: result_order.id,
                    user_id: result_order.user_id,
                    status: result_order.status,
                    products: [],
                    quantites: []
                }
                // Get Products and quantites
                query = `Select * from orders inner join order_products
                on orders.id = order_products.order_id where order_id = $1`;
                const results = (await connection.query(query, [order.id])).rows;
                for (const result of results) {
                    order.quantites.push(parseInt(result.quantity));
                    order.products.push(await productStore.show(result.product_id));
                }
                orders.push(order);
            }
            

            // end connection
            connection.release();

            return orders;
        } catch (error) {
            throw new Error(`can not get orders for user ${user_id}. Error: ${error}`);
        }
    }
 
    async create(user: User, order: Order): Promise<Order> {
        try {
            const productStore = new ProductStore();
            // get connection
            const connection = await client.connect();
            // Create an order with user.id
            // setup query
            let query = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) returning *';
            // excute the query
            const result_order = await (await connection.query(query, [order.status, user.id])).rows[0];
            const new_order: Order = {
                id: result_order.id,
                user_id: result_order.user_id,
                status: result_order.status,
                products: [],
                quantites: []
            }

            // Add products to the order
            query = `INSERT INTO order_products(
                quantity, order_id, product_id) 
                VALUES ($1, $2, $3) returning * `;
            for (const idx in order.products) {
                    const product = order.products[idx];
                    const quantity = order.quantites[idx];
                    const row = (await connection.query(query,
                        [quantity, result_order.id, product.id])).rows[0];
                    new_order.products.push(await productStore.show(row.product_id));
                    new_order.quantites.push(row.quantity);
                
            }

            // end connection
            connection.release();

            return new_order;
        } catch (error) {
            throw new Error(`can not create new order for user ${user.user_name}. Error: ${error}`);
        }
    }

    async edit(order: Order): Promise<Order> {
        // can not change order user_id
        // will change status and replace the old products and quantites
        // it shlould be a transaction
        try {
            const productStore = new ProductStore();
            // get connection
            const connection = await client.connect();
            // Remove old products and quantites
            let query = 'DELETE FROM order_products WHERE order_id=$1';
            // excute the query
            await connection.query(query, [order.id]);
            // update
            // setup query
            query = 'UPDATE orders SET status = $1 WHERE id=$2 returning *';
            // excute the query
            const result_order = await (await connection.query(query, [order.status, order.id])).rows[0];
            const new_order: Order = {
                id: result_order.id,
                user_id: result_order.user_id,
                status: result_order.status,
                products: [],
                quantites: []
            }
            // Add products to the order
            query = `INSERT INTO order_products(
                quantity, order_id, product_id) 
                VALUES ($1, $2, $3) returning * `;
            for (const idx in order.products) {
                    const product = order.products[idx];
                    const quantity = order.quantites[idx];
                    const row = (await connection.query(query,
                        [quantity, result_order.id, product.id])).rows[0];
                    new_order.products.push(await productStore.show(row.product_id));
                    new_order.products.push(row.quantity);
                
            }
            // end connection
            connection.release();

            return new_order;
        } catch (error) {
            throw new Error(`can not update order ${order.id}. Error: ${error}`);
        }
    }

    async delete(id: string): Promise<Boolean> {
        try {
            // get connection
            const connection = await client.connect();
            // setup query
            let query = 'DELETE FROM order_products WHERE order_id=($1)';
            // excute the query
            await connection.query(query, [id]);
            // setup 2nd query
            query = 'DELETE FROM orders WHERE id=($1)';
            // excute 2nd query
            await connection.query(query, [id]);
            // end connection
            connection.release();

            return true;
        } catch (error) {
            throw new Error(`can not delete order ${id}. Error: ${error}`);
        }
    }

}
