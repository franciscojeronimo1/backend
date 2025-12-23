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
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProductService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, description, banner, category_id, has_custom_prices = false, custom_prices = [], }) {
            // Verificar se categoria existe
            const category = yield prisma_1.default.category.findUnique({
                where: { id: category_id },
            });
            if (!category) {
                throw new Error("Categoria não encontrada");
            }
            // Se categoria não tem tamanhos, produto deve ter preço fixo
            if (!category.has_sizes && !price) {
                throw new Error("Produto deve ter preço fixo quando a categoria não tem tamanhos");
            }
            // Se tem preços customizados, validar
            if (has_custom_prices) {
                if (!custom_prices ||
                    !Array.isArray(custom_prices) ||
                    custom_prices.length === 0) {
                    throw new Error("Produto com preços customizados deve ter preços definidos. Envie um array com pelo menos um preço por tamanho.");
                }
                // Validar que cada preço tem size_id e price
                for (const customPrice of custom_prices) {
                    if (!customPrice.size_id ||
                        customPrice.price === undefined ||
                        customPrice.price === null) {
                        throw new Error("Cada preço customizado deve ter size_id e price definidos");
                    }
                }
            }
            // Se não tem preços customizados e categoria tem tamanhos, usar preço fixo não faz sentido
            // Mas vamos permitir para compatibilidade com produtos antigos
            const product = yield prisma_1.default.product.create({
                data: {
                    name,
                    price: price ? Number(price) : null,
                    description,
                    banner,
                    category_id,
                    has_custom_prices,
                    custom_prices: has_custom_prices && custom_prices.length > 0
                        ? {
                            create: custom_prices.map((sp) => ({
                                size_id: sp.size_id,
                                price: sp.price,
                            })),
                        }
                        : undefined,
                },
                include: {
                    custom_prices: {
                        include: {
                            size: true,
                        },
                    },
                    category: {
                        include: {
                            size_prices: {
                                include: {
                                    size: true,
                                },
                            },
                        },
                    },
                },
            });
            return product;
        });
    }
}
exports.CreateProductService = CreateProductService;
