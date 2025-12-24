import { FinishOrderService } from "../../services/order/FinishOrderService";
import { Request, Response } from "express";
class FinishOrderController {
  async handle(req: Request , res: Response) {
    try {
      const { order_id } = req.body;

      const finishOrderService = new FinishOrderService();

      const order = await finishOrderService.execute({
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



    export { FinishOrderController };