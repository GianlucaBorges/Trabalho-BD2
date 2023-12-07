import { Request, Response } from "express";
import ListProjectsNameService from "../Services/ListProjectsNameService";

export class ProjectsController {
  async listProjectsName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listProjectsNameService = new ListProjectsNameService();

    const ProjectsName = await listProjectsNameService.execute();

    return response.json(ProjectsName);
  }
}