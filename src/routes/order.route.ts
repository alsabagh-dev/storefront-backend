import express from 'express';
import OrderController from '../controller/order.controller';

const order_controller = new OrderController();
const order_router = express.Router();

order_router.get('/:user_id', order_controller.get_user_orders)
    .post('/', order_controller.add_order);

export default order_router;
