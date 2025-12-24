import { Request, Response } from 'express';
import { SalesService } from '../../services/order/SalesService';

class SalesController {
  async handle(req: Request, res: Response) {
    try {
      const { period, date, start_date, end_date } = req.query;

      // Validar período
      if (!period || !['day', 'week', 'month', 'custom'].includes(period as string)) {
        return res.status(400).json({ 
          error: 'Período inválido. Use: day, week, month ou custom' 
        });
      }

      const salesService = new SalesService();
      const result = await salesService.execute({
        user_id: req.user_id,
        period: period as 'day' | 'week' | 'month' | 'custom',
        date: date as string | undefined,
        start_date: start_date as string | undefined,
        end_date: end_date as string | undefined,
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { SalesController };
