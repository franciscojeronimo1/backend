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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const SalesService_1 = require("../../services/order/SalesService");
class SalesController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { period, date, start_date, end_date } = req.query;
                // Validar período
                if (!period || !['day', 'week', 'month', 'custom'].includes(period)) {
                    return res.status(400).json({
                        error: 'Período inválido. Use: day, week, month ou custom'
                    });
                }
                const salesService = new SalesService_1.SalesService();
                const result = yield salesService.execute({
                    period: period,
                    date: date,
                    start_date: start_date,
                    end_date: end_date,
                });
                return res.json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.SalesController = SalesController;
