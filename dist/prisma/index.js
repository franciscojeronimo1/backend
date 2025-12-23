"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prismaClient;
try {
    prismaClient = new client_1.PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    // Verificar conexão apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
        prismaClient.$connect().catch((error) => {
            console.error('Erro ao conectar com o banco de dados:', error);
        });
    }
}
catch (error) {
    console.error('Erro ao inicializar Prisma Client:', error);
    throw error;
}
exports.default = prismaClient;
