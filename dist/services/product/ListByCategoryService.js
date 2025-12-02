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
exports.ListByCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListByCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ category_id }) {
            // Verificar se categoria existe
            const category = yield prisma_1.default.category.findUnique({
                where: { id: category_id },
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
            const products = yield prisma_1.default.product.findMany({
                where: {
                    category_id: category_id
                },
                include: {
                    custom_prices: {
                        include: {
                            size: true
                        },
                        orderBy: {
                            size: {
                                order: 'asc'
                            }
                        }
                    }
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            // Formatar resposta com preços disponíveis
            const formattedProducts = products.map(product => {
                // Se produto tem preços customizados, usar eles
                // Senão, usar preços da categoria (se existirem)
                const prices = product.has_custom_prices && product.custom_prices.length > 0
                    ? product.custom_prices.map(cp => ({
                        size: cp.size,
                        price: cp.price
                    }))
                    : category.size_prices && category.size_prices.length > 0
                        ? category.size_prices.map(cp => ({
                            size: cp.size,
                            price: cp.price
                        }))
                        : []; // Array vazio se não houver preços
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    banner: product.banner,
                    price: product.price, // Preço fixo (se não usar tamanhos)
                    has_custom_prices: product.has_custom_prices,
                    has_sizes: category.has_sizes,
                    prices: prices,
                    created_at: product.created_at,
                    updated_at: product.updated_at
                };
            });
            return formattedProducts;
        });
    }
}
exports.ListByCategoryService = ListByCategoryService;
