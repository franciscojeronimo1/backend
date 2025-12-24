import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveitemService";

class RemoveItemController {
    async handle(req: Request, res: Response) {
        try {
            const item_id  = req.query.item_id as string;

            const removeItemService = new RemoveItemService();
            const item = await removeItemService.execute({
                user_id: req.user_id,
                item_id
            });
            return res.json(item);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { RemoveItemController }