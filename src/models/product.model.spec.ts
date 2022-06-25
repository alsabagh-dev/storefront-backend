import { Product, ProductStore } from './product.model';

const store = new ProductStore();

describe('Product Model', () => {
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

    it('create method should add a product', async () => {
        const product: Product = {
            name: 'test_prod_0.0.1',
            price: 123.654
        }

        const result = await store.create(product);

        expect(result.name).toEqual(product.name);
        expect(result.price.toString()).toEqual(product.price.toString());
    });

    it('index method should return a list of products', async () => {
        const product: Product = {
            name: 'test_prod_1.0.1',
            price: 123.654
        }

        await store.create(product);

        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].name).toBeDefined();
    });

    it('show method should return the correct product', async () => {
        const product: Product = {
            name: 'test_prod_0.0.2',
            price: 223.654
        }

        const insert_result = await store.create(product);
        const select_result = await store.show('' + insert_result.id);
        expect(select_result.name).toEqual(product.name);
        expect(select_result.price.toString()).toEqual(product.price.toString());
    });

    it('edit method should update the correct product', async () => {
        const product: Product = {
            name: 'test_prod_0.0.3',
            price: 223.654
        }
        const new_name = 'test_prod_0.0.3-edited', new_price = 0.5;

        const insert_result = await store.create(product);
        insert_result.name = new_name;
        insert_result.price = new_price;

        const updated_product = await store.edit(insert_result);
        expect(updated_product.name).toEqual(new_name);
        expect(updated_product.price.toString()).toEqual(new_price.toString());

        const showd_product = await store.show('' + insert_result.id);
        expect(showd_product.name).toEqual(new_name);
        expect(showd_product.price.toString()).toEqual(new_price.toString());
    });

    it('delete method should remove the product', async () => {
        const product: Product = {
            name: 'test_prod_0.0.4',
            price: 423.654
        }

        const insert_result = await store.create(product);

        await store.delete('' + insert_result.id);

        const showed = await store.show('' + insert_result.id);
        expect(showed).toBeUndefined();
    });
});
