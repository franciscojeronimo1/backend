import { Request, Response  } from "express";
import {DetailsUserService} from "../../services/user/DetailsUserService";

class DatailsUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        
        const detailsUserService = new DetailsUserService();

        const user = await detailsUserService.execute(user_id);

        return res.json(user);
    }
}
    export {DatailsUserController}