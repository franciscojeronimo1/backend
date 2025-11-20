"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
// Tratamento de erro na inicialização
prismaClient.$connect().catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
});
exports.default = prismaClient;
