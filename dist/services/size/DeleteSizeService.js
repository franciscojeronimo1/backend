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
exports.DeleteSizeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteSizeService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ size_id }) {
            // Verificar se tamanho existe
            const size = yield prisma_1.default.productSize.findUnique({
                where: { id: size_id },
                include: {
                    category_prices: true,
                    product_prices: true,
                    items: true,
                },
            });
            if (!size) {
                throw new Error("Tamanho não encontrado");
            }
            // Verificar se tamanho está sendo usado
            const hasCategoryPrices = size.category_prices.length > 0;
            const hasProductPrices = size.product_prices.length > 0;
            const hasItems = size.items.length > 0;
            if (hasCategoryPrices || hasProductPrices || hasItems) {
                let usageDetails = [];
                if (hasCategoryPrices) {
                    usageDetails.push(`${size.category_prices.length} preço(s) de categoria`);
                }
                if (hasProductPrices) {
                    usageDetails.push(`${size.product_prices.length} preço(s) de produto`);
                }
                if (hasItems) {
                    usageDetails.push(`${size.items.length} item(ns) em pedidos`);
                }
                throw new Error(`Não é possível deletar tamanho que está sendo usado: ${usageDetails.join(", ")}`);
            }
            // Deletar tamanho
            const deletedSize = yield prisma_1.default.productSize.delete({
                where: {
                    id: size_id,
                },
            });
            return deletedSize;
        });
    }
}
exports.DeleteSizeService = DeleteSizeService;
