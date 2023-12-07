import { Router } from "express";
import viewCommonUserRouter from "../modules/viewCommonUser/Routes/viewCommonUser.routes";
import viewProdutorRouter from "../modules/viewProdutor/Routes/viewProdutor.routes";
import adminRouter from "../modules/admin/Routes/admin.routes";
import eventsRouter from "../modules/events/Routes/events.routes";
import spacesRouter from "../modules/spaces/Routes/spaces.routes";
import projectsRouter from "../modules/projects/Routes/projects.routes";
import agentsRouter from "../modules/agents/Routes/agents.routes";

const routes = Router();

routes.use("/events", eventsRouter);
routes.use("/spaces", spacesRouter);
routes.use("/projects", projectsRouter);
routes.use("/agents", agentsRouter);
routes.use("/common", viewCommonUserRouter);
routes.use("/productor", viewProdutorRouter);
routes.use("/admin", adminRouter);

export default routes;