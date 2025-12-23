# 🍕 Backend Sistema de Pizzaria

Backend completo desenvolvido em Node.js/TypeScript para gerenciamento de uma pizzaria, incluindo sistema de pedidos, produtos, categorias, tamanhos e autenticação de usuários. Projeto configurado para deploy serverless na Vercel.

## 📋 Sobre o Projeto

Este é um sistema backend robusto desenvolvido para gerenciar todas as operações de uma pizzaria, desde o cadastro de produtos até o controle completo de pedidos. O sistema suporta:

- **Gestão de Usuários**: Autenticação JWT com hash de senhas
- **Gestão de Categorias**: Organização de produtos por categorias
- **Gestão de Produtos**: Cadastro com preços fixos ou variáveis por tamanho
- **Sistema de Tamanhos**: Suporte a diferentes tamanhos (P, M, G, Família) com preços personalizados
- **Gestão de Pedidos**: Criação, edição, envio e finalização de pedidos
- **Pizza Meia a Meia**: Suporte para pizzas com dois sabores diferentes
- **Upload de Imagens**: Integração com Cloudinary para armazenamento de imagens
- **Relatórios de Vendas**: Sistema de busca e relatórios de vendas
- **Delivery**: Suporte a pedidos com endereço e método de pagamento

## 🚀 Tecnologias Utilizadas

### Core
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional

### Autenticação & Segurança
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **express-async-errors** - Tratamento de erros assíncronos

### Upload & Storage
- **Cloudinary** - Armazenamento de imagens na nuvem
- **express-fileupload** - Upload de arquivos
- **multer** - Middleware de upload

### Outras
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente
- **validator** - Validação de dados

### Deploy
- **Vercel** - Plataforma serverless

## 🔧 Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pizzaria-backend.git
cd pizzaria-backend/backend
```

### 2. Instale as dependências
```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pizzaria?schema=public"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui"
PORT=3333

CLOUDINARY_NAME="seu_cloudinary_name"
CLOUDINARY_KEY="sua_cloudinary_key"
CLOUDINARY_SECRET="seu_cloudinary_secret"
```

### 4. Configure o banco de dados

Execute as migrações do Prisma:

```bash
yarn prisma migrate dev
```

Gere o cliente Prisma:

```bash
yarn prisma generate
```

### 5. Execute o projeto

**Modo desenvolvimento:**
```bash
yarn dev
```

**Modo produção:**
```bash
yarn build
yarn start
```

O servidor estará rodando em `http://localhost:3333`


backend/
├── src/
│   ├── controllers/     # Controladores das rotas
│   ├── services/        # Lógica de negócio
│   ├── middlewares/     # Middlewares (autenticação, etc)
│   ├── config/          # Configurações (multer, etc)
│   ├── prisma/          # Cliente Prisma
│   ├── routes.ts        # Definição de rotas
│   └── server.ts        # Configuração do Express
├── prisma/
│   ├── schema.prisma    # Schema do banco de dados
│   └── migrations/      # Migrações do banco
├── dist/                # Código compilado (TypeScript)
└── package.json
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (8 rounds)
- Autenticação JWT com expiração de 30 dias
- Middleware de autenticação em todas as rotas protegidas
- Validação de dados de entrada
- Tratamento centralizado de erros

## 🚀 Deploy na Vercel

O projeto está configurado para deploy serverless na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente no dashboard da Vercel
3. O build será executado automaticamente usando o script `vercel-build`

## 📝 Scripts Disponíveis

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o TypeScript e gera o Prisma Client
- `yarn start` - Inicia o servidor em modo produção
- `yarn vercel-build` - Build otimizado para Vercel
- `yarn prisma:generate` - Gera o Prisma Client

## 🎯 Funcionalidades Principais

✅ Sistema completo de autenticação JWT  
✅ CRUD de categorias, produtos e tamanhos  
✅ Sistema de pedidos com rastreamento de status  
✅ Suporte a pizzas meia a meia  
✅ Preços fixos ou variáveis por tamanho  
✅ Upload de imagens com Cloudinary  
✅ Sistema de busca de clientes  
✅ Relatórios de vendas  
✅ Suporte a delivery com endereço e método de pagamento  
✅ API RESTful bem estruturada  
✅ TypeScript para type safety  
✅ Prisma ORM para queries type-safe  
✅ Deploy serverless na Vercel  

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para gerenciamento de pizzaria da minha Mae

---

**💼 Projeto desenvolvido para demonstrar habilidades em desenvolvimento backend com Node.js, TypeScript, Express, Prisma e deploy serverless.**
