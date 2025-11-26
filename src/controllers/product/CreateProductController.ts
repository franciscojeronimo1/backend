import { Request, response, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";

import { v2 as cloudinary , UploadApiResponse} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id, has_custom_prices, custom_prices } = req.body;

    const createProductService = new CreateProductService();

    let bannerUrl: string | undefined = undefined;

    // Upload de imagem é opcional
    if (req.files && Object.keys(req.files).length > 0) {
      const file: UploadedFile = req.files['file'] as UploadedFile;

      if (file) {
        try {
          const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, function (error, result) {
              if (error) {
                reject(error);
              }
              resolve(result!);
            }).end(file.data);
          });

          bannerUrl = resultFile.url;
        } catch (error) {
          throw new Error("Erro ao fazer upload da imagem");
        }
      }
    }

    // Parse custom_prices se vier como string JSON
    let parsedCustomPrices = custom_prices;
    if (custom_prices && typeof custom_prices === 'string') {
      try {
        parsedCustomPrices = JSON.parse(custom_prices);
      } catch (error) {
        throw new Error("custom_prices deve ser um JSON válido");
      }
    }

    // Converter has_custom_prices para boolean se vier como string
    const hasCustomPrices = has_custom_prices === true || has_custom_prices === 'true';

    const product = await createProductService.execute({
      name,
      price,
      description,
      banner: bannerUrl,
      category_id,
      has_custom_prices: hasCustomPrices,
      custom_prices: parsedCustomPrices
    });

    return res.json(product);
  }
}
export { CreateProductController };