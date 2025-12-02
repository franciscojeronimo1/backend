import {Request, Response} from 'express';
import { AddItemService } from '../../services/order/AdditemService';


class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount, size_id, product_id_2, size_id_2 } = req.body;
    
    const addItem = new AddItemService();
    const item = await addItem.execute({
        order_id,
        product_id,
        amount,
        size_id,
        product_id_2,
        size_id_2
    });
    return res.json(item);

    }    
    }
    export { AddItemController }