import { prisma } from '../../src/server';

export async function cleanDb() {
  await prisma.empresa.deleteMany();
  await prisma.licencaAmbiental.deleteMany();
  await prisma.user.deleteMany();
}

// eslint-disable-next-line
export async function loginAndGetToken(server: any): Promise<string> {
  const createUser = {
    email: 'usuarioexistente@example.com',
    password: 'senha123',
    name: 'Novo Usuário'
  };

  const loginData = {
    password: 'senha123',
    email: 'usuarioexistente@example.com',
  };

  await server
    .post('/api/auth/cadastro')
    .send(createUser);
  
  const response = await server
    .post('/api/auth/login')
    .send(loginData);

  if (response.status !== 201) {
    throw new Error(`Erro ao fazer login: ${response.status}`);
  }

  const token = response.body.token;
  if (!token) {
    throw new Error('Token não encontrado na resposta');
  }

  return token;
}

// eslint-disable-next-line
export async function createCompanyAndGetId(server: any): Promise<number> {
  const companyData = {
    razao_social: 'Nova Empresa Ltda',
    cnpj: '12345678901234',
    cep: '12345-678',
    cidade: 'Cidade',
    estado: 'Estado',
    bairro: 'Bairro',
    complemento: 'Complemento',
  };

  const response = await prisma.empresa.create({
    data: companyData
  });  

  const companyId = response.id;
  if (!companyId) {
    throw new Error('ID da empresa não encontrado na resposta');
  }

  return companyId;
}
