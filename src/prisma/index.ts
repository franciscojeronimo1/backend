import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Tratamento de erro na inicialização
prismaClient.$connect().catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error)
})

export default prismaClient