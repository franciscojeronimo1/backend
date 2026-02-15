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
exports.RemoveItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveItemService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, item_id }) {
            // Verificar se o item existe e o pedido pertence ao usuário
            const item = yield prisma_1.default.item.findUnique({
                where: { id: item_id },
                include: {
                    order: true
                }
            });
            if (!item) {
                throw new Error("Item não encontrado");
            }
            if (item.order.user_id !== user_id) {
                throw new Error("Você não tem permissão para remover este item");
            }
            const order = yield prisma_1.default.item.delete({
                where: {
                    id: item_id
                }
            });
            return order;
        });
    }
}
exports.RemoveItemService = RemoveItemService;
