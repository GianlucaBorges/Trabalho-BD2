import { Request, Response } from "express";
import ListEventsNameService from "../Services/ListEventsNameService";
import ListClasEtariaService from "../Services/ListClasEtariaService";

export class EventsController {
  async listClasEtaria(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listClasEtariaService = new ListClasEtariaService();

    const clasEtaria = await listClasEtariaService.execute();

    return response.json(clasEtaria);
  }
  async listEventsName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listEventsNameService = new ListEventsNameService();

    const eventsNames = await listEventsNameService.execute();

    return response.json(eventsNames);
  }
}
