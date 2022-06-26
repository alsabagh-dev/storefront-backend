import express from 'express';
import ProductController from '../controller/product.controller';

const product_controller = new ProductController();
const product_router = express.Router();

product_router
    .get('/', product_controller.get_products)
    .get('/:id', product_controller.get_product)
    .post('/', product_controller.add_product);

export default product_router;
