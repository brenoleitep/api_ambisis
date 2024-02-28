import supertest from 'supertest';
import { app, prisma } from '../../src/server';
import { cleanDb, loginAndGetToken } from '../helpers/helpers';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /company/createCompany', () => {

  it('deve criar uma nova empresa com sucesso', async () => {
    const companyData = {
      razao_social: 'Nova Empresa Ltda',
      cnpj: '12345678901234',
      cep: '12345-678',
      cidade: 'Cidade',
      estado: 'Estado',
      bairro: 'Bairro',
      complemento: 'Complemento',
    };
    const token = await loginAndGetToken(server);

    const response = await server
      .post('/api/company/createCompany')
      .set('Authorization', token)
      .send(companyData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.razao_social).toBe(companyData.razao_social);
  });

  it('deve retornar erro se a empresa já estiver cadastrada', async () => {
    const companyData = {
      razao_social: 'Empresa Existente Ltda',
      cnpj: '12345678901234',
      cep: '12345-678',
      cidade: 'Cidade',
      estado: 'Estado',
      bairro: 'Bairro',
      complemento: 'Complemento',
    };

    const token = await loginAndGetToken(server);

    await prisma.empresa.create({
      data: companyData
    });  

    const response = await server
      .post('/api/company/createCompany')
      .set('Authorization', token)
      .send(companyData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Empresa já existe!');
  });
});

describe('GET /company/listCompany', () => {
  it('deve retornar uma lista de empresas', async () => {
    const companyData = {
      razao_social: 'Empresa Existente Ltda',
      cnpj: '12345678901234',
      cep: '12345-678',
      cidade: 'Cidade',
      estado: 'Estado',
      bairro: 'Bairro',
      complemento: 'Complemento',
    };

    const token = await loginAndGetToken(server);

    await prisma.empresa.create({
      data: companyData
    }); 

    const response = await server
      .get('/api/company/listCompany')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('deve retornar erro se não houver empresas cadastradas', async () => {
    const token = await loginAndGetToken(server);

    const response = await server
      .get('/api/company/listCompany')
      .set('Authorization', token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Empresas não listadas');
  });
});

describe('PUT /company/updateCompany/:id', () => {

  it('deve retornar erro se a empresa não existir', async () => {
    const companyId = 9999; 
    const updatedCompanyData = {
      razao_social: 'Nova Razão Social Ltda',
      cep: '54321-876',
    };
    const token = await loginAndGetToken(server);

    const response = await server
      .put(`/api/company/updateCompany/${companyId}`)
      .set('Authorization', token)
      .send(updatedCompanyData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Empresa não encontrada');
  });
});

describe('DELETE /company/deleteCompany/:id', () => {
  it('deve excluir uma empresa existente', async () => {
    const companyData = {
      razao_social: 'Empresa Existente Ltda',
      cnpj: '12345678901234',
      cep: '12345-678',
      cidade: 'Cidade',
      estado: 'Estado',
      bairro: 'Bairro',
      complemento: 'Complemento',
    };
    await prisma.empresa.create({
      data: companyData
    }); 
    const companyId = 1; 

    const token = await loginAndGetToken(server);

    const response = await server
      .delete(`/api/company/deleteCompany/${companyId}`)
      .set('Authorization', token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Empresa não encontrada');
  });

  it('deve retornar erro se a empresa não existir', async () => {
    const companyId = 9999;
    const token = await loginAndGetToken(server);

    const response = await server
      .delete(`/api/company/deleteCompany/${companyId}`)
      .set('Authorization', token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Empresa não encontrada');
  });
});
