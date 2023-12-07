import { Router } from "express";
import { SpacesController } from "../Controllers/SpacesController";

const spacesRouter = Router();
const spacesController = new SpacesController();

spacesRouter.get("/names", spacesController.listSpacesName);

export default spacesRouter;
