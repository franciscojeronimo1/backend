import { Request, Response } from "express";
import { UpdatePasswordService } from "../../services/user/UpdatePasswordService";

class UpdatePasswordController {
  async handle(req: Request, res: Response) {
    const { current_password, new_password } = req.body;

    const updatePasswordService = new UpdatePasswordService();

    const result = await updatePasswordService.execute({
      user_id: req.user_id,
      current_password,
      new_password,
    });

    return res.json(result);
  }
}

export { UpdatePasswordController };
