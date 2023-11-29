import { Request, Response } from "express";
import ListClassificacaoEtariaService from "../Services/ListClassificacaoEtariaService";

export class ClassificacaoEtariaController {
  async find(request: Request, response: Response): Promise<Response> {
    const listClassificacaoEtariaService = new ListClassificacaoEtariaService();

    const classificacaoEtaria = await listClassificacaoEtariaService.execute();

    return response.json(classificacaoEtaria);
  }
}
