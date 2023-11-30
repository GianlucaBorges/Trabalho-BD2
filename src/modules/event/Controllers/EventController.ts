import { Request, Response } from "express";
import ListEventNameService from "../Services/ListEventNameService";

export class EventController {
  async findAllNames(request: Request, response: Response): Promise<Response> {
    const listEventNameService = new ListEventNameService();

    const eventName = await listEventNameService.execute();

    return response.json(eventName);
  }
}
