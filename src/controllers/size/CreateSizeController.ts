import { Request, Response } from "express";
import { CreateSizeService } from "../../services/size/CreateSizeService";

class CreateSizeController {
    async handle(req: Request, res: Response) {
        const { name, display, order } = req.body;

        const createSizeService = new CreateSizeService();
        const size = await createSizeService.execute({
            name,
            display,
            order
        });

        return res.json(size);
    }
}

export { CreateSizeController };

