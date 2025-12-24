import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name, has_sizes, size_prices } = req.body;
        const createCategoryService = new CreateCategoryService();
        
        const category = await createCategoryService.execute({
            user_id: req.user_id,
            name,
            has_sizes,
            size_prices
        });

        return res.json(category)
    }
}
export { CreateCategoryController }