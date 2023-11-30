import { Router } from "express";
import { ViewCommonUserController } from "../Controllers/ViewCommonUserController";

const viewCommonUserRouter = Router();
const viewCommonUserController = new ViewCommonUserController();

viewCommonUserRouter.get("/names", viewCommonUserController.findAllNames);

export default viewCommonUserRouter;
