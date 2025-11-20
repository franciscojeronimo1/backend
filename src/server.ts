import express, { Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes'
import fileUpload from 'express-fileupload'

const app = express()
app.use(express.json())
app.use(fileUpload({
    limits: {fileSize:50 * 1024 *1024 } // maximo 50mb
}))
app.use(cors())

app.use(router)

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    try {
        app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
    } catch (error) {
    }
}

app.use((err: Error, req:Request, res:Response, next:NextFunction)=> {
    if(err instanceof Error){
    //Se for uma instancia do tipo error
    console.error('Error:', err.message)
    console.error('Stack:', err.stack)
    return res.status(400).json({
        error: err.message
    })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

// Middleware para capturar erros não tratados
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
})

// Exportar para Vercel (serverless)
module.exports = app

// Iniciar servidor apenas localmente
if (require.main === module) {
    const PORT = process.env.PORT || 3333
    app.listen(PORT, ()=> console.log(`servidor online na porta ${PORT}!!`))
}