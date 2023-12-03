import { Router } from "express";
import viewCommonUserRouter from "../modules/viewCommonUser/Routes/viewCommonUser.routes";
import viewProdutorRouter from "../modules/viewProdutor/Routes/viewProdutor.routes";

const routes = Router();

routes.use("/common", viewCommonUserRouter);
routes.use("/productor", viewProdutorRouter);

export default routes;