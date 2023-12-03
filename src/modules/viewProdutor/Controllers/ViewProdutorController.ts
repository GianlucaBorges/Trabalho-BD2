import { Request, Response } from "express";
import ListEventsByFiltersService from "../Services/ListEventsByFiltersService";
import ListClassificacaoEtariaService from "../Services/ListClassificacaoEtariaService";
import ListEventNameService from "../Services/ListEventNameService";
import ListSpaceNameService from "../Services/ListSpaceNameService";
import ListSpaceOwnerNameService from "../Services/ListSpaceOwnerNameService";
import ListEventOwnerNameService from "../Services/ListEventOwnerNameService";
import ListProjectNameService from "../Services/ListProjectNameService";
import ListProjectOwnerNameService from "../Services/ListProjectOwnerNameService";
import ListEventsByFiltersPaginatedService from "../Services/ListEventsByFiltersPaginatedService";

export class ViewProdutorController {
  async listClassificacaoEtaria(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listClassificacaoEtariaService = new ListClassificacaoEtariaService();

    const classificacao_etaria = await listClassificacaoEtariaService.execute();

    return response.json(classificacao_etaria);
  }
  async listEventOwnerNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listEventOwnerNameService = new ListEventOwnerNameService();

    const eventOwnerNames = await listEventOwnerNameService.execute();

    return response.json(eventOwnerNames);
  }

  async listEventNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listEventNameService = new ListEventNameService();

    const eventNames = await listEventNameService.execute();

    return response.json(eventNames);
  }

  async listProjectNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listProjectNameService = new ListProjectNameService();

    const projectNames = await listProjectNameService.execute();

    return response.json(projectNames);
  }

  async listProjectOwnerNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listProjectOwnerNameService = new ListProjectOwnerNameService();

    const projectOwnerNames = await listProjectOwnerNameService.execute();

    return response.json(projectOwnerNames);
  }

  async listSpaceNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listSpaceNameService = new ListSpaceNameService();

    const spaceNames = await listSpaceNameService.execute();

    return response.json(spaceNames);
  }

  async listSpaceOwnerNames(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listSpaceOwnerNameService = new ListSpaceOwnerNameService();

    const spaceOwnerNames = await listSpaceOwnerNameService.execute();

    return response.json(spaceOwnerNames);
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
