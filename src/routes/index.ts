import { Router } from "express";
import classificacaoEtariaRouter from "../modules/classificacaoEtaria/Routes/faixaEtaria.routes";
import eventRouter from "../modules/event/Routes/event.routes";

const routes = Router();

routes.use("/classificacao_etaria", classificacaoEtariaRouter);
routes.use("/events", eventRouter);

export default routes;