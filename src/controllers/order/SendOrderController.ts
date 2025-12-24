import { Request, Response} from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id } = req.body;

      const sendOrder = new SendOrderService();

      const order = await sendOrder.execute({
        user_id: req.user_id,
        order_id,
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
export { SendOrderController };