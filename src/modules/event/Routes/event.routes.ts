import { Router } from "express";
import { EventController } from "../Controllers/EventController";

const eventRouter = Router();
const eventController = new EventController();

eventRouter.get("/names", eventController.findAllNames);

export default eventRouter;
