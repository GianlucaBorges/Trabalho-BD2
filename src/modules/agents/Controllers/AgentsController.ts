import { Request, Response } from "express";
import ListSpacesOwnerNameService from "../Services/ListSpacesOwnerNameService";
import ListEventsOwnerService from "../Services/ListEventsOwnerNameService";
import ListProjectsOwnerNameService from "../Services/ListProjectsOwnerNameService";

export class AgentsController {
  async listEventsOwnerName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listEventsOwnerService = new ListEventsOwnerService();

    const eventsOwnerNames = await listEventsOwnerService.execute();

    return response.json(eventsOwnerNames);
  }
  async listSpacesOwnerName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listSpacesOwnerNameService = new ListSpacesOwnerNameService();

    const spacesOwnerName = await listSpacesOwnerNameService.execute();

    return response.json(spacesOwnerName);
  }
  async listProjectsOwnerName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listProjectsOwnerNameService = new ListProjectsOwnerNameService();

    const ProjectsOwnerName = await listProjectsOwnerNameService.execute();

    return response.json(ProjectsOwnerName);
  }
}
