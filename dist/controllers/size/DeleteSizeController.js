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
exports.DeleteSizeController = void 0;
const DeleteSizeService_1 = require("../../services/size/DeleteSizeService");
class DeleteSizeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const size_id = req.query.size_id;
            const deleteSizeService = new DeleteSizeService_1.DeleteSizeService();
            try {
                const size = yield deleteSizeService.execute({ size_id });
                return res.json(size);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                }
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
}
exports.DeleteSizeController = DeleteSizeController;
