import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const deleteCategoryService = new DeleteCategoryService();

    try {
      const category = await deleteCategoryService.execute({ 
        user_id: req.user_id,
        category_id 
      });
      return res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { DeleteCategoryController };

