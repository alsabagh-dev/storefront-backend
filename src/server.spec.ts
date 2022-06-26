import app from './server';
import request from "supertest";

let token: string;

describe('Endpoints ', () => {
    it('"/" should return hello world', async () => {
        const result = await request(app).get('/');
        expect(result.text).toEqual('Hello World!');
        expect(result.statusCode).toEqual(200);
    });

    it('[GET] "/users" should return 401 with no token', async () => {
        const result = await request(app).get("/users");
        expect(result.text).toEqual('"Error: need to login"');
        expect(result.statusCode).toEqual(401);
    });

    it('[POST] "/users" should add user and return token', async () => {
        const query = {
            "first_name": "test",
            "last_name": "user",
            "user_name": "test_user_0.0.1",
            "password": "123456"
        }
        const result = await request(app)
            .post("/users")
            .set('Content-type', 'application/json')
            .send(query);

        expect(result.body.split('.').length).toEqual(3);
        expect(result.statusCode).toEqual(200);
        token = result.body;
    });

    it('[GET] "/users" should return list of users using  token', async () => {
        const result = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${token}`);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.statusCode).toEqual(200);
    });

    it('[GET] "/users/:id" should return a user using  token', async () => {
        const id = 1;
        const result = await request(app)
            .get("/users/" + id)
            .set('Authorization', `Bearer ${token}`);

        expect(result.body.id).toEqual(1);
        expect(result.statusCode).toEqual(200);
    });

    it('[GET] "/products" should return list of products without  token', async () => {
        const result = await request(app)
            .get("/products");
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.statusCode).toEqual(200);
    });

    it('[GET] "/prooduct/:id" should return a product without  token', async () => {
        const id = 1;
        const result = await request(app)
            .get("/products/" + id);

        expect(result.body.id).toEqual(1);
        expect(result.statusCode).toEqual(200);
    });

    it('[POST] "/products" should not add without token', async () => {
        const query = {
            "name":'product-123654-vvv',
            "price": 3.687
        }
        const result = await request(app)
            .post("/products")
            .send(query);

        expect(result.text).toEqual('"Error: need to login"');
        expect(result.statusCode).toEqual(401);
    });

    it('[POST] "/products" should  add product using token', async () => {
        const query = {
            "name":'product-123654-vvv',
            "price": 3.687
        }
        const result = await request(app)
            .post("/products")
            .set('Authorization', `Bearer ${token}`)
            .send(query);

        expect(result.body.name).toEqual(query.name);
        expect(result.statusCode).toEqual(200);
    });
    
    it('[GET] "/orders/:user_id" should not add without token', async () => {
        const user_id = 1;
        const result = await request(app)
            .get("/orders/"+user_id);

        expect(result.text).toEqual('"Error: need to login"');
        expect(result.statusCode).toEqual(401);
    });

    it('[GET] "/orders/" should  add product using token', async () => {
        const user_id = 1;
        const result = await request(app)
            .get("/orders/"+user_id)
            .set('Authorization', `Bearer ${token}`);
        
        expect(result.body.length).toBeDefined();
        expect(result.statusCode).toEqual(200);
    });
});
