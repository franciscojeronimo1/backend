import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";


class CreateOrderController {
    async handle(req: Request, res: Response){
        try {
            const { table, name, address, payment_method } = req.body;

            const createOrderService = new CreateOrderService();
            const order = await createOrderService.execute({
                user_id: req.user_id,
                table,
                name,
                address,
                payment_method
            })
            return res.json(order);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }    
    }

    export { CreateOrderController }