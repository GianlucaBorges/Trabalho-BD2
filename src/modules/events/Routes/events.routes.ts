import { Router } from "express";
import { EventsController } from "../Controllers/EventsController";

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.get(
  "/clas-etaria",
  eventsController.listClasEtaria
);
eventsRouter.get(
  "/names",
  eventsController.listEventsName
);

export default eventsRouter;
