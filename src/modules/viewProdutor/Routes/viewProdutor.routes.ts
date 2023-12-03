import { Router } from "express";
import { ViewProdutorController } from "../Controllers/ViewProdutorController";

const viewProdutorRouter = Router();
const viewProdutorController = new ViewProdutorController();

viewProdutorRouter.get(
  "/clas-etaria",
  viewProdutorController.listClassificacaoEtaria
);
viewProdutorRouter.get("/events/names", viewProdutorController.listEventNames);
viewProdutorRouter.get(
  "/events/owner/names",
  viewProdutorController.listEventOwnerNames
);
viewProdutorRouter.get(
  "/project/names",
  viewProdutorController.listProjectNames
);
viewProdutorRouter.get(
  "/project/owner/names",
  viewProdutorController.listProjectOwnerNames
);
viewProdutorRouter.get("/spaces/names", viewProdutorController.listSpaceNames);
viewProdutorRouter.get(
  "/spaces/owner/names",
  viewProdutorController.listSpaceOwnerNames
);
viewProdutorRouter.get("/events", viewProdutorController.findEvents);
viewProdutorRouter.get(
  "/events/paginated",
  viewProdutorController.findEventsPaginated
);

export default viewProdutorRouter;
