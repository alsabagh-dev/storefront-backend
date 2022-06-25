import { Order, OrderStore } from './orders.model';
import { User, UserStore } from './user.model';
import { Product, ProductStore } from './product.model';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

const users: User[] = [];
const products: Product[] = [];
const quantites: number[] = [];
const orders: Order[] =  [];

describe('Order Model', () => {

    beforeAll(async () => {
        // create some products
        for (let i = 1; i < 10; i++) {
            const product = await productStore.create({
                name: `product0.0.${i}-order`,
                price: i
            });

            products.push(
                product
            );
            quantites.push(i);
        }
        // create some users and orders
        for (let ID = 1; ID < 10; ID++) {
            const user: User = {
                first_name: `first0.0.${ID}-order`,
                last_name: `last0.0.${ID}-order`,
                user_name: `user0.0.${ID}-order`,
                password: `pass0.0${ID}-order`,
            }
            const created_user = await userStore.create(user);    
            user.id = created_user.id;
            users.push(
                user
            )
            orders.push({
                user_id: user.id?.toString() as string,
                products: [...products],
                quantites: [...quantites],
                status: false
            })
        }
    })

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        const result = await store.create(users[0], orders[0]);
        expect(result.user_id).toEqual(''+users[0].id?.toString());
    });

    it('index method should return a list of orders', async () => {
        await store.create(users[1], orders[1]);
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct order', async () => {
        const insert_result = await store.create(users[2], orders[2]);
        const select_result = await store.show('' + insert_result.id);
        expect(select_result?.user_id as string).toEqual(''+users[2].id?.toString());
        expect(select_result?.products.length as number).toEqual(orders[2].products.length);
        
    });

    it('show_by_user method should return the correct orders', async () => {
        await store.create(users[8], orders[2]);
        await store.create(users[8], orders[3]);
        await store.create(users[8], orders[4]);
        const select_result = await store.show_by_user('' + users[8].id);
        expect(select_result.length ).toEqual(3);
    });

    it('edit method should update the correct order', async () => {
        const insert_result = await store.create(users[5], orders[5]);
        insert_result.status = true;
        insert_result.products = [];

        const updated_order = await store.edit(insert_result);
        expect(updated_order.status).toBeTrue();
        expect(updated_order.products.length).toEqual(0);
    });

    it('delete method should remove the order', async () => {
        const insert_result = await store.create(users[4], orders[4]);
        await store.delete('' + insert_result.id);
        const showed = await store.show('' + insert_result.id);
        expect(showed).toBeNull();
    });
});
