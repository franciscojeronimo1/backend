import {Request, Response} from 'express';
import {RemoveOrderService} from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        try {
            const  order_id  = req.query.order_id as string;
            const removeOrder = new RemoveOrderService();

            const order = await removeOrder.execute({ 
                user_id: req.user_id,
                order_id 
            });

            return res.json(order);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

}

export { RemoveOrderController }