import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(req: Request, res: Response) {
        try {
            const order_id  = req.query.order_id as string
            const detailOrderService = new DetailOrderService();

            const orders = await detailOrderService.execute({
                user_id: req.user_id,
                order_id,
            });
            return res.json(orders);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
export { DetailOrderController };