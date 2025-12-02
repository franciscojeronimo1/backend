"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ product_id }) {
            // Verificar se produto existe e se tem itens associados
            const product = yield prisma_1.default.product.findUnique({
                where: { id: product_id },
                include: {
                    items: true,
                },
            });
            if (!product) {
                throw new Error("Produto não encontrado");
            }
            // Verificar se produto está sendo usado em pedidos
            if (product.items.length > 0) {
                throw new Error(`Não é possível deletar produto que está sendo usado em ${product.items.length} item(ns) de pedido(s).`);
            }
            // Deletar produto (os custom_prices serão deletados automaticamente por cascade)
            const deletedProduct = yield prisma_1.default.product.delete({
                where: {
                    id: product_id,
                },
            });
            return deletedProduct;
        });
    }
}
exports.DeleteProductService = DeleteProductService;
