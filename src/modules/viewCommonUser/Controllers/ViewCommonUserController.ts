import { Request, Response } from "express";
import ListEventsByFiltersService from "../Services/ListEventsByFiltersService";
import ListClassificacaoEtariaService from "../Services/ListClassificacaoEtariaService";
import ListEventNameService from "../Services/ListEventNameService";
import ListSpaceNameService from "../Services/ListSpaceNameService";
import ListEventsByFiltersPaginatedService from "../Services/ListEventsByFiltersPaginatedService";
import DownloadTableCsvService from "../Services/DownloadTableCsvService";
import AppError from "../../../errors/AppError";

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

  async downloadTableCsv(request: Request, response: Response): Promise<any> {
    const queryParams = request.query;
    const downloadTableCsvService = new DownloadTableCsvService();

    try {
      const filePath = await downloadTableCsvService.execute(queryParams);

      return response.download(filePath);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
    }
  }
}
