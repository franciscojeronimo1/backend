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
exports.DeleteCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ category_id }) {
            // Verificar se categoria existe
            const category = yield prisma_1.default.category.findUnique({
                where: { id: category_id },
                include: {
                    products: true,
                },
            });
            if (!category) {
                throw new Error("Categoria não encontrada");
            }
            // Verificar se categoria tem produtos associados
            if (category.products.length > 0) {
                throw new Error("Não é possível deletar categoria que possui produtos associados. Delete os produtos primeiro.");
            }
            // Deletar categoria (os size_prices serão deletados automaticamente por cascade)
            const deletedCategory = yield prisma_1.default.category.delete({
                where: {
                    id: category_id,
                },
            });
            return deletedCategory;
        });
    }
}
exports.DeleteCategoryService = DeleteCategoryService;
