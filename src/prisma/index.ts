import {PrismaClient} from '@prisma/client'

// Singleton pattern para ambiente serverless (Vercel)
declare global {
    var prisma: PrismaClient | undefined
}

let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
    // Em produção/serverless, usar instância global se existir
    prismaClient = global.prisma || new PrismaClient({
        log: ['error'],
    })
    global.prisma = prismaClient
} else {
    // Em desenvolvimento, criar nova instância
    prismaClient = new PrismaClient({
        log: ['query', 'error', 'warn'],
    })
}

// Verificar conexão apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    prismaClient.$connect().catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error)
    })
}

export default prismaClient