import { Product, ProductStore } from '../models/product.model';
import { Express, Response, Request } from 'express';
const store = new ProductStore();

export default class ProductController {
    async get_products(_req: Request, res: Response): Promise<void> {
        try {
            const products = await store.index()
            res.json(products);
        } catch (error) {
            console.error(error);

            res.status(500);
            res.send(`Sorry can not get products, please try again later
                ${error}`);
        }
    }

    async get_product(req: Request, res: Response): Promise<void> {
        const product_id = req.params.id;
        try {
            const product = await store.show(product_id);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(404);
            res.send(`Sorry can not find product ${product_id}
            ${error}`);
        }
    }

    async add_product(req: Request, res: Response): Promise<void> {
        const name = req.body.name, price = parseFloat(req.body.price);
        if (name === undefined || price === undefined) {
            res.status(400);
            res.send(`missing field(s) product must have 'name' and 'price'`)
        } else {
            const new_product: Product = {
                name: name,
                price: price
            } 
            try {
                const product = await store.create(new_product);
                res.json(product);
            } catch (error) {
                console.error(error);

                res.status(500);
                res.send(`Sorry can not create products, please try again later
                ${error}`);
            }
        }
    }

    // @Todo : update and delete. (done in model. )
}