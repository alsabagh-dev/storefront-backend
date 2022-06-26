import express, { Request, Response } from 'express'
import user_router from './routes/user.route';
import product_router from './routes/product.route';
import order_router from './routes/order.route';

const app: express.Application = express()
const address: string = "http://0.0.0.0:3000"

app.use(express.json())

app.use('/users', user_router);
app.use('/products', product_router);
app.use('/orders',order_router );

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
