import { Router } from "express";
import { ProjectsController } from "../Controllers/ProjectsController";

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get(
  "/names",
  projectsController.listProjectsName
);

export default projectsRouter;
