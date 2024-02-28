# api_ambisis

🌐 Deploy
O deploy, do banco e da API, ambos foram hospedados, no Render.

URL da API: 
https://api-ambisis.onrender.com

!Importante
O deploy da API foi realizado no Render com o plano free trial, com isso, uma das limitações é que o Render desliga o servidor com um certo tempo de inatividade.

Caso for testar o deploy, ou o Front-End, e as respostas demorarem para chegar, muito provavelmente, o servidor estava desligado, e o Render está iniciando.

Esse processo de iniciar o servidor, geralmente demora em torno de 5 minutos.

📚 Documentação
Para acessar a documentação feita pelo swagger:

Utilizando o link de deploy com: https://api-ambisis.onrender.com/api-docs;
Utilizando o localhost, para isso, faça todo o procedimento de instalação, e inicie o localhost com npm run dev, e digite no navegador localhost:3030/api-docs;
Como a documentação é uma rota da própria API, caso vá utilizá-la com o link do deploy, lembre-se que ela também está sujeita ao processo de desligamento por inatividade do Render.

💻 Pré-requisitos
Antes de começar, verifique se você atendeu aos seguintes requisitos:

Node.js: 20.11.0 (Utilizado no desenvolvimento);
NPM: v10.4.0 (Utilizado no desenvolvimento);
Postgres: v16.1 (Utilizado no desenvolvimento);
🔧 Tecnologias
Para a construção do projeto foi utilizado as seguintes tecnologias:

- TypeScript: v5.3.2;
- Node: v20.11.0;
- Express (Framework de Node.js): v4.18.2;
- Prisma (ORM): v5.6.0;
- PostgreSQL (Banco de dados);
- Jest (Criação de testes): v29.7.0;
- Supertest (Simulador de solicitações HTTP): v6.3.3;
- GitHub (versionamento de código);
- Dotenv/ Dotenv-cli (Carregar variáveis de ambiente): v16.3.1 e 7.3.0;

📏 Padronização
Neste projeto foi utilizado:

- ESLint para padronizar o código e manter consistência;
- Prettier para autoformatação do código;
- Husky para validar e padronizar os commits;


🚀 Instalando a API Ambisis

- Para instalar, siga estas etapas:

- Clone o repositório: git clone https://github.com/brenoleitep/api_ambisis;
- Acesse o diretório do projeto: cd api_ambisis;
- Instale as dependências: npm install ou npm i.


🗄️ Banco de Dados
- As informações sobre as tabelas criadas e relações estão no arquivo schema.prisma;
- Certifique-se de ter o PostgreSQL instalado na máquina;
Para rodar o projeto em desenvolvimento, copie o arquivo .env.example, crie um novo com nome .env.development e configure a variável de ambiente relacionada ao banco de dados: DATABASE_URL, conforme exemplificado no .env.example;
- Caso utilize o comando npm run start, deverá criar o arquivo apenas .env ao invés de .env.development.

🔶 Prisma
Para criar o banco e as tabelas:

- Caso vá utilizar o comando de desenvolvimento npm run dev, execute as migrações do prisma com o comando:
  -  npm run migration:dev;

- Caso prefira utilizar o comando de start npm run start, execute as migrações do Prisma: 
  - npx prisma migrate deploy;
- Caso queira rodar os testes, configure o arquivo .env.test, e execute as migrações do prisma com: 
  - npm run test:migration:run.


☕ Usando a API
- Para usar, siga estas etapas:

    - Desenvolvimento: npm run dev;
    - Início simples: npm run start;
