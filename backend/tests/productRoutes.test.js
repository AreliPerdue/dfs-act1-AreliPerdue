import request from 'supertest';
import app from '../server.js';

let token;

beforeAll(async () => {
  // Registrar usuario de prueba (si ya existe, ignorará el error de duplicado)
    await request(app)
        .post('/api/users/register')
        .send({ email: 'jestuser@example.com', password: '123456' });

    // Login para obtener token
    const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'jestuser@example.com', password: '123456' });

    token = res.body.token;
    });

    describe('Product Routes', () => {
    it('should create a new product', async () => {
        const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: 'Producto Jest',
            precio: 100,
            descripcion: 'Producto de prueba',
            stock: 5
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all products', async () => {
        const res = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    });
