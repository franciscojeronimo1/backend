import {PrismaClient} from '@prisma/client'

let prismaClient: PrismaClient

try {
    prismaClient = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    
    // Verificar conexão apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
        prismaClient.$connect().catch((error) => {
            console.error('Erro ao conectar com o banco de dados:', error)
        })
    }
} catch (error) {
    console.error('Erro ao inicializar Prisma Client:', error)
    throw error
}

export default prismaClient