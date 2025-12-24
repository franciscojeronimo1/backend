import {Request, Response} from 'express';
import { AddItemService } from '../../services/order/AdditemService';


class AddItemController {
    async handle(req: Request, res: Response) {
        try {
            const { order_id, product_id, amount, size_id, product_id_2, size_id_2 } = req.body;
        
            const addItem = new AddItemService();
            const item = await addItem.execute({
                user_id: req.user_id,
                order_id,
                product_id,
                amount,
                size_id,
                product_id_2,
                size_id_2
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
    export { AddItemController }