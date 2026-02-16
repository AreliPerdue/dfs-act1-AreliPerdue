import request from 'supertest';
import app from '../server.js';

jest.setTimeout(30000); // aumentar timeout para Atlas

let token;
let productId;

describe('Full Integration Flow', () => {
    beforeAll(async () => {
        // Registrar usuario de prueba (si ya existe, ignorará duplicado)
        await request(app)
        .post('/api/users/register')
        .send({ email: 'jestuser@example.com', password: '123456' });

        // Login para obtener token
        const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'jestuser@example.com', password: '123456' });

        token = res.body.token;
    });

    it('should create a new product', async () => {
        const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: 'Producto Integración',
            precio: 150,
            descripcion: 'Producto creado en test de integración',
            stock: 10
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        productId = res.body._id;
    });

    it('should get all products', async () => {
        const res = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update the product', async () => {
        const res = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ precio: 200, stock: 20 });

        expect(res.statusCode).toBe(200);
        expect(res.body.precio).toBe(200);
        expect(res.body.stock).toBe(20);
    });

    it('should delete the product', async () => {
        const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
    });
