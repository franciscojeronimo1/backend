import { Request, Response } from "express";
import { SearchClientsService } from "../../services/order/SearchClientsService";

class SearchClientsController {
    async handle(req: Request, res: Response) {
        try {
            const { search } = req.query;

            if (!search || typeof search !== 'string') {
                return res.json([]);
            }

            const searchClientsService = new SearchClientsService();
            const clients = await searchClientsService.execute({ 
                user_id: req.user_id,
                search 
            });

            return res.json(clients);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { SearchClientsController };
