import { Request, Response } from "express";
import { DeleteSizeService } from "../../services/size/DeleteSizeService";

class DeleteSizeController {
  async handle(req: Request, res: Response) {
    const size_id = req.query.size_id as string;

    const deleteSizeService = new DeleteSizeService();

    try {
      const size = await deleteSizeService.execute({ 
        user_id: req.user_id,
        size_id 
      });
      return res.json(size);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { DeleteSizeController };

