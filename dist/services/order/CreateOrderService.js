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
exports.CreateOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateOrderService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, table, name, address, payment_method }) {
            try {
                const order = yield prisma_1.default.order.create({
                    data: {
                        user_id,
                        table: table,
                        name: name,
                        address: address ? address.trim() : null,
                        payment_method: payment_method || null
                    }
                });
                // Log para debug
                if (process.env.NODE_ENV === 'development') {
                    console.log(`[CreateOrderService] Order created successfully: ${order.id}`);
                }
                return order;
            }
            catch (error) {
                // Log detalhado do erro
                console.error('[CreateOrderService] Error creating order:', error);
                if (error instanceof Error) {
                    console.error('[CreateOrderService] Error message:', error.message);
                    console.error('[CreateOrderService] Error stack:', error.stack);
                }
                throw error;
            }
        });
    }
}
exports.CreateOrderService = CreateOrderService;
