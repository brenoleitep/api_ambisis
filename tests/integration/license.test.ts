import supertest from 'supertest';
import { app } from '../../src/server';
import { cleanDb, createCompanyAndGetId, loginAndGetToken } from '../helpers/helpers';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /license', () => {
  it('deve criar uma nova licença ambiental com sucesso', async () => {
    const token = await loginAndGetToken(server);
    const companyId = await createCompanyAndGetId(server);

    const newLicenseData = {
      empresaId: companyId,
      numero: '123456789',
      orgao_ambiental: 'IBAMA',
      emissao: new Date('2023-01-01'),
      validade: new Date('2024-01-01')
    };

    const response = await server
      .post('/api/license/createLicense')
      .set('Authorization', token)
      .send(newLicenseData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.numero).toBe(newLicenseData.numero);
  });
});

describe('GET /license', () => {
  it('deve listar todas as licenças ambientais', async () => {

    const token = await loginAndGetToken(server);
    const companyId = await createCompanyAndGetId(server);
    const newLicenseData = {
      empresaId: companyId,
      numero: '123456789',
      orgao_ambiental: 'IBAMA',
      emissao: new Date('2023-01-01'),
      validade: new Date('2024-01-01')
    };

    await server
      .post('/api/license/createLicense')
      .set('Authorization', token)
      .send(newLicenseData);

    const response = await server.get('/api/license/listLicense').set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
});

describe('DELETE /license/:id', () => {

  it('deve excluir uma licença ambiental existente', async () => {
    const token = await loginAndGetToken(server);
    const companyId = await createCompanyAndGetId(server);
    const newLicenseData = {
      empresaId: companyId,
      numero: '123456789',
      orgao_ambiental: 'IBAMA',
      emissao: new Date('2023-01-01'),
      validade: new Date('2024-01-01')
    };

    const responseLicense = await server
      .post('/api/license/createLicense')
      .set('Authorization', token)
      .send(newLicenseData);
  
    const licenseId = responseLicense.body.id;

    const response = await server.delete(`/api/license/deleteLicense/${licenseId}`).set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Licença ambiental deletada com sucesso!');
  });
});

