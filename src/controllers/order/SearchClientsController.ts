import { Request, Response } from "express";
import { SearchClientsService } from "../../services/order/SearchClientsService";

class SearchClientsController {
    async handle(req: Request, res: Response) {
        const { search } = req.query;

        if (!search || typeof search !== 'string') {
            return res.json([]);
        }

        const searchClientsService = new SearchClientsService();
        const clients = await searchClientsService.execute({ search });

        return res.json(clients);
    }
}

export { SearchClientsController };
