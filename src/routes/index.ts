import { Router } from "express";
import viewCommonUserRouter from "../modules/viewCommonUser/Routes/viewCommonUser.routes";

const routes = Router();

routes.use("/view_common_user", viewCommonUserRouter); 

export default routes;