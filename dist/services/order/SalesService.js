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
exports.SalesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const dateUtils_1 = require("../../utils/dateUtils");
class SalesService {
    getDateRange(period, date, start_date, end_date) {
        const now = new Date();
        let start;
        let end;
        switch (period) {
            case "day":
                if (date) {
                    start = (0, dateUtils_1.toLocalDateStart)(date);
                    end = (0, dateUtils_1.toLocalDateEnd)(date);
                }
                else {
                    start = new Date(now);
                    start.setHours(0, 0, 0, 0);
                    end = new Date(now);
                    end.setHours(23, 59, 59, 999);
                }
                break;
            case "week":
                const dayOfWeek = now.getDay();
                start = new Date(now);
                start.setDate(now.getDate() - dayOfWeek);
                start.setHours(0, 0, 0, 0);
                end = new Date(start);
                end.setDate(start.getDate() + 6);
                end.setHours(23, 59, 59, 999);
                break;
            case "month":
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                start.setHours(0, 0, 0, 0);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                break;
            case "custom":
                if (!start_date || !end_date) {
                    throw new Error("start_date e end_date são obrigatórios para período customizado");
                }
                start = (0, dateUtils_1.toLocalDateStart)(start_date);
                end = (0, dateUtils_1.toLocalDateEnd)(end_date);
                break;
            default:
                throw new Error("Período inválido. Use: day, week, month ou custom");
        }
        return { start, end };
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, period, date, start_date, end_date }) {
            if (period === "custom" && (!start_date || !end_date)) {
                throw new Error("start_date e end_date são obrigatórios para período customizado");
            }
            const { start, end } = this.getDateRange(period, date, start_date, end_date);
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    user_id,
                    status: true,
                    created_at: { gte: start, lte: end },
                },
                include: { items: true },
            });
            let total = 0;
            for (const order of orders) {
                for (const item of order.items) {
                    total += item.price * item.amount;
                }
            }
            return {
                total: Number(total.toFixed(2)),
                period,
                start_date: (0, dateUtils_1.formatDateLocal)(start),
                end_date: (0, dateUtils_1.formatDateLocal)(end),
                orders_count: orders.length,
            };
        });
    }
}
exports.SalesService = SalesService;
