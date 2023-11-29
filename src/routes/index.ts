import { Router } from "express";
import classificacaoEtariaRouter from "../modules/classificacaoEtaria/Routes/faixaEtaria.routes";

const routes = Router();

routes.use("/classificacao_etaria", classificacaoEtariaRouter);

export default routes;