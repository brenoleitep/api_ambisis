import { default as supertest } from 'supertest';
import { app, prisma } from '../../src/server';
import { cleanDb } from '../helpers/helpers';

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /auth/cadastro', () => {
  it('deve criar um novo usuário com sucesso', async () => {
    const userData = {
      email: 'usuarioexistente@example.com',
      password: 'senha123',
      name: 'Novo Usuário'
    };

    const response = await server
      .post('/api/auth/cadastro')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe(userData.email);
    expect(response.body.data.name).toBe(userData.name);

  });

  it('deve retornar erro se o usuário já estiver cadastrado', async () => {
    const userData = {
      email: 'usuarioexistente@example.com',
      password: 'senha123',
      name: 'Usuário Existente'
    };

    await prisma.user.create({
      data: userData
    });

    const response = await server
      .post('/api/auth/cadastro')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuário já cadastrado');
  });
});


describe('POST /api/auth/login', () => {
  it('deve fazer login com sucesso', async () => {
    const createUser = {
      name: 'Breno',
      email: 'brenoleitepereira@gmail.com',
      password: 'gBda22*/03'
    };

    await server
      .post('/api/auth/cadastro')
      .send(createUser);

    const userData = {
      email: 'brenoleitepereira@gmail.com',
      password: 'gBda22*/03'
    };

    const response = await server
      .post('/api/auth/login')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(userData.email);
  });

  it('deve retornar erro para credenciais inválidas', async () => {
    
    const createUser = {
      name: 'Breno',
      email: 'brenoleitepereira@gmail.com',
      password: 'gBda22*/03'
    };

    await server
      .post('/api/auth/cadastro')
      .send(createUser);

    const userData = {
      email: 'brenoleitepereira@gmail.com',
      password: 'gBda22/03'
    };

    const response = await server
      .post('/api/auth/login')
      .send(userData);
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuário ou senha incorretos');
  });
});
