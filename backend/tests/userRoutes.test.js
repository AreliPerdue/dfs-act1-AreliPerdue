import request from 'supertest';
import app from '../server.js'; // importa tu app de Express

jest.setTimeout(30000); // aumentar timeout

beforeAll(async () => {
    // Registrar usuario de prueba (si ya existe, ignorará el error de duplicado)
    await request(app)
        .post('/api/users/register')
        .send({
        email: 'jestuser@example.com',
        password: '123456'
        });
    });

    describe('User Routes', () => {
    it('should register a new user (or handle duplicate)', async () => {
        const res = await request(app)
        .post('/api/users/register')
        .send({
            email: 'jestuser@example.com',
            password: '123456'
        });

        // Acepta 201 (creado) o 400/409 (duplicado) según tu controlador
        expect([201, 400, 409]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
        .post('/api/users/login')
        .send({
            email: 'jestuser@example.com',
            password: '123456'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
