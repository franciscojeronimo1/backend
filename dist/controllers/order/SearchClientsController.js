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
exports.SearchClientsController = void 0;
const SearchClientsService_1 = require("../../services/order/SearchClientsService");
class SearchClientsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.query;
            if (!search || typeof search !== 'string') {
                return res.json([]);
            }
            const searchClientsService = new SearchClientsService_1.SearchClientsService();
            const clients = yield searchClientsService.execute({ search });
            return res.json(clients);
        });
    }
}
exports.SearchClientsController = SearchClientsController;
