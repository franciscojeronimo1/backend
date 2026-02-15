"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prismaClient;
if (process.env.NODE_ENV === 'production') {
    // Em produção/serverless, usar instância global se existir
    prismaClient = global.prisma || new client_1.PrismaClient({
        log: ['error'],
    });
    global.prisma = prismaClient;
}
else {
    // Em desenvolvimento, criar nova instância
    prismaClient = new client_1.PrismaClient({
        log: ['query', 'error', 'warn'],
    });
}
// Verificar conexão apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    prismaClient.$connect().catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });
}
exports.default = prismaClient;
