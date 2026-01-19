# Guia Completo: Tecnologias Usadas e Como Começar o Novo Sistema

## 📋 TECNOLOGIAS E BIBLIOTECAS USADAS NO SISTEMA ATUAL (Pizzaria)

### Stack Principal
- **Node.js** com **TypeScript** (v5.9.2)
- **Express.js** (v4.17.2) - Framework web
- **Prisma ORM** (v6.19.0) com PostgreSQL
- **Yarn** (v4.9.1) - Gerenciador de pacotes

### Dependências Principais

#### Banco de Dados
- `@prisma/client` (v6.15.0) - Cliente Prisma
- `@prisma/adapter-pg` (v7.0.0) - Adaptador PostgreSQL
- `prisma` (v6.19.0) - CLI Prisma

#### Autenticação e Segurança
- `jsonwebtoken` (v9.0.2) - JWT para autenticação
- `bcryptjs` (v3.0.2) - Hash de senhas
- `express-async-errors` (v3.1.1) - Tratamento de erros assíncronos

#### Upload de Arquivos
- `express-fileupload` (v1.5.2) - Upload de arquivos
- `multer` (v2.0.2) - Middleware de upload
- `cloudinary` (v2.8.0) - Armazenamento de imagens na nuvem

#### Outros
- `cors` (v2.8.5) - Controle de CORS
- `dotenv` (v17.2.2) - Variáveis de ambiente
- `validator` (v13.15.23) - Validação de dados

### DevDependencies
- `typescript` (v5.9.2)
- `ts-node-dev` (v2.0.0) - Hot reload em desenvolvimento
- `@types/*` - Tipos TypeScript para as bibliotecas

---

## 🏗️ ESTRUTURA DO PROJETO ATUAL

```
src/
├── server.ts              # Configuração do Express
├── routes.ts              # Definição de rotas
├── prisma/
│   └── index.ts          # Cliente Prisma configurado
├── config/
│   └── multer.ts         # Configuração de upload
├── middlewares/
│   └── isAuthenticated.ts # Middleware de autenticação JWT
├── controllers/          # Controladores (camada de requisição)
│   ├── user/
│   ├── category/
│   ├── product/
│   └── order/
└── services/             # Serviços (lógica de negócio)
    ├── user/
    ├── category/
    ├── product/
    └── order/
```

### Padrão de Arquitetura
- **Controllers**: Recebem requisições HTTP e chamam Services
- **Services**: Contêm a lógica de negócio e acesso ao banco (Prisma)
- **Middleware**: Validação de autenticação (JWT)
- **Routes**: Define endpoints e aplica middlewares

---

## 🔐 SISTEMA DE AUTENTICAÇÃO ATUAL

### Fluxo:
1. Usuário faz login → recebe JWT token
2. Token é enviado no header: `Authorization: Bearer <token>`
3. Middleware `isAuthenticated` valida token
4. `req.user_id` é preenchido com ID do usuário autenticado

### Como funciona:
- Senha é hash com `bcryptjs` (8 rounds)
- JWT contém: name, email, subject (user.id)
- Expiração: 30 dias
- Secret armazenado em `JWT_SECRET` (env)

---

## 📤 UPLOAD DE ARQUIVOS

### Configuração:
- **Cloudinary**: Armazenamento de imagens na nuvem
- **Multer**: Configurado para usar `memoryStorage` em produção (Vercel)
- **express-fileupload**: Usado também para uploads maiores (50MB limite)
- Arquivos temporários salvos em `/tmp` localmente

### Como funciona:
```typescript
// Exemplo de upload com Cloudinary
const result = await cloudinary.uploader.upload_stream({}, callback).end(file.data)
bannerUrl = result.url
```

---

## 🗄️ BANCO DE DADOS (Prisma)

### Configuração:
- PostgreSQL como banco
- Schema em `prisma/schema.prisma`
- Migrations em `prisma/migrations/`
- Cliente gerado com `yarn prisma generate`

### Estrutura atual:
- `User` - Usuários do sistema
- `Category` - Categorias de produtos
- `Product` - Produtos
- `ProductSize` - Tamanhos de produtos
- `order` - Pedidos
- `Item` - Itens do pedido
- Relacionamentos: User → Categories, Products, Orders (onDelete: Cascade)

---

## ⚙️ VARIÁVEIS DE AMBIENTE NECESSÁRIAS

```env
DATABASE_URL=           # URL de conexão PostgreSQL
JWT_SECRET=            # Chave secreta para JWT
PORT=3333              # Porta do servidor (opcional)
CLOUDINARY_NAME=       # Nome da conta Cloudinary
CLOUDINARY_KEY=        # API Key Cloudinary
CLOUDINARY_SECRET=     # API Secret Cloudinary
```

---

## 🚀 DEPLOYMENT (Vercel)

- Configurado para serverless
- Build script: `vercel-build`
- Arquivo `vercel.json` configura rotas
- Prisma migrations deployadas automaticamente

---

## 🎯 FUNCIONALIDADES DO NOVO SISTEMA (Bater Ponto)

### Módulos necessários:

1. **Sistema de Bater Ponto**
   - Entrada/Saída de colaboradores
   - Histórico de pontos

2. **Tabela Customizável**
   - Tabela dinâmica com campos customizáveis
   - Upload de logo
   - Exportação de dados

3. **Controle de Estoque**
   - Cadastro de produtos/materiais
   - Entrada/Saída de estoque
   - Alertas de estoque baixo

4. **Sistema de Administração**
   - Roles: Admin e Colaborador
   - Permissões diferenciadas
   - Apenas Admin pode modificar tudo

5. **Aba de Conversas**
   - Mensagens salvas
   - Histórico de conversas (ex: pedindo pagamento)

6. **Aba de Gastos**
   - Cadastro de gastos
   - Upload de comprovante (foto)
   - Categorização de gastos

7. **Sistema de Daily**
   - Criar daily com tarefas
   - Concluir daily
   - Visualizar daily pendentes/completadas

---

## 📝 COMEÇAR O NOVO BACKEND - PASSO A PASSO

### 1. INICIALIZAÇÃO DO PROJETO

```bash
# Criar nova pasta do projeto
mkdir ponto-backend
cd ponto-backend

# Inicializar Yarn
yarn init -y
yarn set version 4.9.1

# Instalar TypeScript e dependências básicas
yarn add -D typescript @types/node ts-node-dev @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/express-fileupload @types/multer

# Instalar dependências principais
yarn add express express-async-errors cors dotenv jsonwebtoken bcryptjs
yarn add @prisma/client prisma @prisma/adapter-pg
yarn add express-fileupload multer cloudinary validator
```

### 2. CONFIGURAR TYPESCRIPT

Criar `tsconfig.json` (copiar do projeto atual e ajustar):

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true,
    "typeRoots": [
      "./node_modules/types",
      "./src/@types"
    ]
  }
}
```

### 3. CRIAR ESTRUTURA DE PASTAS

```bash
mkdir -p src/{controllers,services,middlewares,config,prisma,@types/express}
```

### 4. CONFIGURAR PRISMA

```bash
yarn prisma init
```

Editar `prisma/schema.prisma` com as models necessárias.

### 5. CONFIGURAR EXPRESS (server.ts)

```typescript
import express, { Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()
app.use(express.json())
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}))
app.use(cors())

// Routes aqui depois

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({ status: 'error', message: 'Internal server error.' })
})

module.exports = app

if (require.main === module) {
    const PORT = process.env.PORT || 3333
    app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}!!`))
}
```

### 6. CONFIGURAR TIPOS EXPRESS

Criar `src/@types/express/index.d.ts`:

```typescript
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
```

### 7. CONFIGURAR PRISMA CLIENT

Criar `src/prisma/index.ts`:

```typescript
import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

export default prismaClient
```

### 8. CRIAR SCHEMA PRISMA BÁSICO

Começar com models essenciais:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(COLABORADOR)  // NOVO: Role para controle de acesso
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
  
  pontos    Ponto[]          // Relacionamento com pontos
  conversas Conversa[]       // Relacionamento com conversas
  gastos    Gasto[]          // Relacionamento com gastos
  dailies   Daily[]          // Relacionamento com dailies
  
  @@map("users")
}

enum UserRole {
  ADMIN
  COLABORADOR
}

model Ponto {
  id          String   @id @default(uuid())
  user_id     String
  entrada     DateTime
  saida       DateTime?
  observacao  String?
  created_at  DateTime @default(now())
  
  user        User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  @@map("pontos")
}

// Adicionar outras models depois...
```

### 9. CONFIGURAR MULTER

Criar `src/config/multer.ts` (copiar do projeto atual)

### 10. CRIAR MIDDLEWARE DE AUTENTICAÇÃO

Criar `src/middlewares/isAuthenticated.ts` (copiar do projeto atual)

### 11. CRIAR MIDDLEWARE DE PERMISSÃO (NOVO)

Criar `src/middlewares/isAdmin.ts`:

```typescript
import { Request, Response, NextFunction} from "express";
import prismaClient from "../prisma";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = await prismaClient.user.findUnique({
        where: { id: req.user_id }
    });
    
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    
    return next();
}
```

### 12. CRIAR PRIMEIROS CONTROLLERS E SERVICES

Começar com:
- `CreateUserController` / `CreateUserService`
- `AuthUserController` / `AuthUserService`
- `CreatePontoController` / `CreatePontoService` (sistema de ponto)

---

## 🎯 ORDEM RECOMENDADA DE IMPLEMENTAÇÃO

### FASE 1: Base (Essencial)
1. ✅ Configurar projeto (TypeScript, Express, Prisma)
2. ✅ Sistema de autenticação (User, Login, JWT)
3. ✅ Sistema de roles (Admin vs Colaborador)
4. ✅ Middleware de permissões (`isAdmin`)

### FASE 2: Core Features
5. ✅ Sistema de Bater Ponto (Ponto model, criar/listar pontos)
6. ✅ Sistema de Daily (Daily model, criar/concluir/listar)
7. ✅ Aba de Gastos (Gasto model, upload de comprovante)

### FASE 3: Features Adicionais
8. ✅ Aba de Conversas (Conversa model, salvar/listar)
9. ✅ Controle de Estoque (Produto, MovimentacaoEstoque models)
10. ✅ Tabela Customizável (TabelaCustom model, upload logo)

---

## 📌 CHECKLIST INICIAL DO NOVO PROJETO

- [ ] Projeto inicializado com Yarn 4.9.1
- [ ] TypeScript configurado
- [ ] Dependências instaladas
- [ ] Estrutura de pastas criada
- [ ] Prisma inicializado e configurado
- [ ] `.env` criado com variáveis necessárias
- [ ] `server.ts` configurado com Express
- [ ] `routes.ts` criado
- [ ] Middleware `isAuthenticated` implementado
- [ ] Middleware `isAdmin` implementado
- [ ] Schema Prisma com models básicas (User, Ponto)
- [ ] Primeira migration criada (`yarn prisma migrate dev`)
- [ ] Cliente Prisma gerado (`yarn prisma generate`)
- [ ] Servidor rodando (`yarn dev`)

---

## 🔑 DIFERENÇAS PRINCIPAIS NO NOVO SISTEMA

### O que precisa ser ADICIONADO:

1. **Sistema de Roles** (Admin/Colaborador)
   - Campo `role` na model User
   - Enum `UserRole`
   - Middleware `isAdmin` para proteger rotas

2. **Upload de Comprovantes** (Gastos)
   - Usar Cloudinary (igual produtos no sistema atual)
   - Salvar URL da imagem no banco

3. **Sistema de Daily**
   - Model Daily com tarefas
   - Status (pendente/concluído)
   - Relacionamento com User

4. **Sistema de Conversas**
   - Model Conversa para salvar mensagens
   - Possivelmente relacionar com User ou Order (se aplicável)

5. **Controle de Estoque**
   - Models: Produto, MovimentacaoEstoque
   - Entrada/Saída de estoque
   - Cálculo de saldo atual

6. **Tabela Customizável**
   - Model com campos dinâmicos (pode usar JSON)
   - Campo para URL da logo (Cloudinary)

---

## 📚 ARQUIVOS PARA COPIAR/ADAPTAR DO PROJETO ATUAL

### Arquivos que podem ser REUTILIZADOS (com ajustes):

1. `src/server.ts` - Configuração básica do Express
2. `src/middlewares/isAuthenticated.ts` - Autenticação JWT
3. `src/config/multer.ts` - Configuração Multer
4. `src/prisma/index.ts` - Cliente Prisma
5. `src/services/user/AuthUserService.ts` - Login
6. `src/services/user/CreateUserService.ts` - Criar usuário (ADICIONAR role)
7. `src/controllers/user/*` - Controllers de usuário (ADICIONAR role)

### Arquivos NOVOS a criar:

1. `src/middlewares/isAdmin.ts` - Verificação de permissão admin
2. `src/services/ponto/*` - Serviços de ponto
3. `src/services/daily/*` - Serviços de daily
4. `src/services/gasto/*` - Serviços de gastos
5. `src/services/conversa/*` - Serviços de conversas
6. `src/services/estoque/*` - Serviços de estoque
7. `src/services/tabela/*` - Serviços de tabela customizável

---

## 🚨 IMPORTANTE: COMEÇAR POR ONDE?

### RECOMENDAÇÃO: Começar pela BASE (Fase 1)

1. **Configurar projeto** (pastas, TypeScript, dependências)
2. **Criar schema Prisma** com User + role
3. **Implementar autenticação** (CreateUser, AuthUser)
4. **Implementar middleware isAdmin**
5. **Criar primeira migration** e testar

Depois disso, você terá a base sólida para adicionar os outros módulos um por um.

---

## 💡 DICAS FINAIS

1. **Sempre use transactions** no Prisma quando houver múltiplas operações
2. **Valide dados** antes de salvar no banco
3. **Use select específico** no Prisma para performance
4. **Trate erros** adequadamente (express-async-errors)
5. **Use migrations** para evoluir o schema
6. **Teste autenticação e permissões** desde o início
7. **Cloudinary** para todos os uploads de imagem
8. **Mantenha a estrutura** de Controllers → Services → Prisma

---

Boa sorte com o novo projeto! 🚀


