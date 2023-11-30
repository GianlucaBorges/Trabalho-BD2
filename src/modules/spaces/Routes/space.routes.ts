import { Router } from "express";
import { SpaceController } from "../Controllers/SpaceController";

const spaceRouter = Router();
const spaceController = new SpaceController();

spaceRouter.get("/names", spaceController.findAllNames);

export default spaceRouter;
