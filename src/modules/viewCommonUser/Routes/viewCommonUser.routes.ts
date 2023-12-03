import { Router } from "express";
import { ViewCommonUserController } from "../Controllers/ViewCommonUserController";

const viewCommonUserRouter = Router();
const viewCommonUserController = new ViewCommonUserController();

viewCommonUserRouter.get(
  "/clas-etaria",
  viewCommonUserController.listClassificacaoEtaria
);
viewCommonUserRouter.get(
  "/events/names",
  viewCommonUserController.listEventNames
);
viewCommonUserRouter.get(
  "/spaces/names",
  viewCommonUserController.listSpaceNames
);
viewCommonUserRouter.get("/events", viewCommonUserController.findEvents);
viewCommonUserRouter.get(
  "/events/paginated",
  viewCommonUserController.findEventsPaginated
);
viewCommonUserRouter.get(
  "/events/csv",
  viewCommonUserController.downloadTableCsv
);

export default viewCommonUserRouter;
