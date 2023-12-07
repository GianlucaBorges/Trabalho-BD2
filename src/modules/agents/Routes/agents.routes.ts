import { Router } from "express";
import { AgentsController } from "../Controllers/AgentsController";

const agentsRouter = Router();
const agentsController = new AgentsController();

agentsRouter.get("/events", agentsController.listEventsOwnerName);
agentsRouter.get("/spaces", agentsController.listSpacesOwnerName);
agentsRouter.get("/projects", agentsController.listProjectsOwnerName);

export default agentsRouter;
