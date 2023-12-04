import { Router } from "express";
import viewCommonUserRouter from "../modules/viewCommonUser/Routes/viewCommonUser.routes";
import viewProdutorRouter from "../modules/viewProdutor/Routes/viewProdutor.routes";
import adminRouter from "../modules/admin/Routes/admin.routes";

const routes = Router();

routes.use("/common", viewCommonUserRouter);
routes.use("/productor", viewProdutorRouter);
routes.use("/admin", adminRouter);

export default routes;