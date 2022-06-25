import { Request, Response } from 'express';
import {Order, OrderStore} from '../models/orders.model';
import { Product, ProductStore } from '../models/product.model';
import { UserStore } from '../models/user.model';

const orderStore = new OrderStore();
const userStore =new UserStore();
const productStore =new ProductStore();

export default class OrderController{
    async get_user_orders(req: Request, res: Response): Promise<void>{
        const user_id = req.params.user_id;
        try {
            const orders = await orderStore.show_by_user(user_id);
            res.json(orders)
        } catch (error) {
            console.error(error);

            res.status(500);
            res.send(`Sorry can not get orders, please try again later`);
        }
    }

    async add_order(req: Request, res: Response): Promise<void>{
        const {
            user_id,
            status,
            products,
            quantites
        } = req.body;
        
        try {
            const order_user = await userStore.show(user_id);
            const order_products: Product[] = [];
            for (const product_id of products) {
                const product = await productStore.show(product_id);
                order_products.push(product);
            }
            const order: Order ={
                user_id: ''+order_user.id ,
                status: status,
                products: order_products,
                quantites:quantites
            }
            const created = await orderStore.create(order_user, order);
            res.json(created);
        } catch (error) {
            console.error(error);

            res.status(500);
            res.send(`Sorry can not create orders, please try again later`);
        }

    }

}
