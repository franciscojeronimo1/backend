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
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category_id, has_custom_prices, custom_prices } = req.body;
            const createProductService = new CreateProductService_1.CreateProductService();
            let bannerUrl = undefined;
            // Upload de imagem é opcional
            if (req.files && Object.keys(req.files).length > 0) {
                const file = req.files['file'];
                if (file) {
                    try {
                        const resultFile = yield new Promise((resolve, reject) => {
                            cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                                if (error) {
                                    reject(error);
                                }
                                resolve(result);
                            }).end(file.data);
                        });
                        bannerUrl = resultFile.url;
                    }
                    catch (error) {
                        throw new Error("Erro ao fazer upload da imagem");
                    }
                }
            }
            // Parse custom_prices se vier como string JSON
            let parsedCustomPrices = custom_prices;
            if (custom_prices && typeof custom_prices === 'string') {
                try {
                    parsedCustomPrices = JSON.parse(custom_prices);
                }
                catch (error) {
                    throw new Error("custom_prices deve ser um JSON válido");
                }
            }
            // Converter has_custom_prices para boolean se vier como string
            const hasCustomPrices = has_custom_prices === true || has_custom_prices === 'true';
            const product = yield createProductService.execute({
                name,
                price,
                description,
                banner: bannerUrl,
                category_id,
                has_custom_prices: hasCustomPrices,
                custom_prices: parsedCustomPrices
            });
            return res.json(product);
        });
    }
}
exports.CreateProductController = CreateProductController;
