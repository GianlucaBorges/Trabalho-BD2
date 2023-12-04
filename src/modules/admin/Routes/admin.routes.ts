import { Router } from "express";
import { AdminController } from "../Controllers/AdminController";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get(
  "/clas-etaria",
  adminController.listClassificacaoEtaria
);
adminRouter.get("/events/names", adminController.listEventNames);
adminRouter.get(
  "/events/owner/names",
  adminController.listEventOwnerNames
);
adminRouter.get(
  "/project/names",
  adminController.listProjectNames
);
adminRouter.get(
  "/project/owner/names",
  adminController.listProjectOwnerNames
);
adminRouter.get("/spaces/names", adminController.listSpaceNames);
adminRouter.get(
  "/spaces/owner/names",
  adminController.listSpaceOwnerNames
);
adminRouter.get("/events", adminController.findEvents);
adminRouter.get(
  "/events/paginated",
  adminController.findEventsPaginated
);
adminRouter.get(
  "/events/csv",
  adminController.downloadTableCsv
);

export default adminRouter;
