import { Router } from "express";
import { ClassificacaoEtariaController } from "../Controllers/FaixaEtariaController";

const classificacaoEtariaRouter = Router();
const classificacaoEtariaController = new ClassificacaoEtariaController();

classificacaoEtariaRouter.get("/", classificacaoEtariaController.find);

export default classificacaoEtariaRouter;
