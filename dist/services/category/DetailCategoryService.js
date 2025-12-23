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
exports.DetailCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ category_id }) {
            const category = yield prisma_1.default.category.findUnique({
                where: {
                    id: category_id
                },
                include: {
                    size_prices: {
                        include: {
                            size: true
                        },
                        orderBy: {
                            size: {
                                order: 'asc'
                            }
                        }
                    }
                }
            });
            if (!category) {
                throw new Error("Categoria não encontrada");
            }
            return {
                id: category.id,
                name: category.name,
                has_sizes: category.has_sizes,
                size_prices: category.size_prices.map(sp => ({
                    id: sp.id,
                    size_id: sp.size_id,
                    price: sp.price,
                    size: {
                        id: sp.size.id,
                        name: sp.size.name,
                        display: sp.size.display,
                        order: sp.size.order
                    }
                })),
                created_at: category.created_at,
                updated_at: category.updated_at
            };
        });
    }
}
exports.DetailCategoryService = DetailCategoryService;
