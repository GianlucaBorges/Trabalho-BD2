import { Request, Response } from "express";
import ListEventsByFiltersService from "../Services/ListEventsByFiltersService";
import ListClassificacaoEtariaService from "../Services/ListClassificacaoEtariaService";
import ListEventNameService from "../Services/ListEventNameService";
import ListSpaceNameService from "../Services/ListSpaceNameService";
import ListEventsByFiltersPaginatedService from "../Services/ListEventsByFiltersPaginatedService";

export class ViewCommonUserController {
  async listClassificacaoEtaria(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listClassificacaoEtariaService = new ListClassificacaoEtariaService();

    const classificacao_etaria = await listClassificacaoEtariaService.execute();

    return response.json(classificacao_etaria);
  }

  async listEventNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listEventNameService = new ListEventNameService();

    const eventNames = await listEventNameService.execute();

    return response.json(eventNames);
  }

  async listSpaceNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listSpaceNameService = new ListSpaceNameService();

    const spaceNames = await listSpaceNameService.execute();

    return response.json(spaceNames);
  }

  async findEvents(request: Request, response: Response): Promise<Response> {
    const queryParams = request.query;
    const listEventsbyFiltersService = new ListEventsByFiltersService();

    const events = await listEventsbyFiltersService.execute(queryParams);

    return response.json(events);
  }

  async findEventsPaginated(
    request: Request,
    response: Response
  ): Promise<Response> {
    const queryParams = request.query;
    const listEventsByFiltersPaginatedService = new ListEventsByFiltersPaginatedService();

    const eventsPaginated = await listEventsByFiltersPaginatedService.execute(queryParams);

    return response.json(eventsPaginated);
  }
}
