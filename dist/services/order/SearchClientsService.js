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
exports.SearchClientsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class SearchClientsService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ search }) {
            // Busca pedidos onde o nome contém o termo de busca (case insensitive)
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    name: {
                        not: null,
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                select: {
                    name: true,
                    address: true,
                    created_at: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            // Agrupa por nome e pega o último endereço usado (mais recente)
            const clientsMap = new Map();
            orders.forEach(order => {
                if (order.name && !clientsMap.has(order.name)) {
                    clientsMap.set(order.name, {
                        name: order.name,
                        address: order.address
                    });
                }
            });
            // Converte Map para Array
            const clients = Array.from(clientsMap.values());
            return clients;
        });
    }
}
exports.SearchClientsService = SearchClientsService;
