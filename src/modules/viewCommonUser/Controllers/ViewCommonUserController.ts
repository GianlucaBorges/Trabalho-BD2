import { Request, Response } from "express";
import ListEventsByFiltersService from "../Services/ListEventsByFiltersService";

export class ViewCommonUserController {
  async findAllNames(request: Request, response: Response): Promise<Response> {
    const queryParams = request.query;
    const listEventsbyFiltersService = new ListEventsByFiltersService();

    const events = await listEventsbyFiltersService.execute(queryParams);

    return response.json(events);
  }
}
