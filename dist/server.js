"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // maximo 50mb
}));
app.use((0, cors_1.default)());
app.use(routes_1.router);
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    try {
        app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
    }
    catch (error) {
    }
}
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instancia do tipo error
        console.error('Error:', err.message);
        console.error('Stack:', err.stack);
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
// Middleware para capturar erros não tratados
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
// Exportar para Vercel (serverless)
module.exports = app;
// Iniciar servidor apenas localmente
if (require.main === module) {
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => console.log(`servidor online na porta ${PORT}!!`));
}
