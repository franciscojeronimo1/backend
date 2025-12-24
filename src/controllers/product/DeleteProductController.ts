import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;

    const deleteProductService = new DeleteProductService();

    try {
      const product = await deleteProductService.execute({ 
        user_id: req.user_id,
        product_id 
      });
      return res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { DeleteProductController };

