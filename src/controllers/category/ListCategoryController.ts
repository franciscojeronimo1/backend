import { Request, Response } from "express";

import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute(req.user_id);

        return res.json(category);
    }
}

export { ListCategoryController }