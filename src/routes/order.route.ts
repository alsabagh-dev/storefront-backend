import express from 'express';
import OrderController from '../controller/order.controller';
import auth from '../middelware/auth.middleware';

const order_controller = new OrderController();
const order_router = express.Router();
order_router.use(auth.verify_middelware);

order_router.get('/:user_id', order_controller.get_user_orders)
    .post('/', order_controller.add_order);

export default order_router;
