import { Request, Response } from "express";
import { ListSizesService } from "../../services/size/ListSizesService";

class ListSizesController {
    async handle(req: Request, res: Response) {
        const listSizesService = new ListSizesService();
        const sizes = await listSizesService.execute(req.user_id);

        return res.json(sizes);
    }
}

export { ListSizesController };

