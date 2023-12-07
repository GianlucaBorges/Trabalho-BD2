import { Request, Response } from "express";
import ListSpacesNameService from "../Services/ListSpacesNameService";

export class SpacesController {
  async listSpacesName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listSpacesNameService = new ListSpacesNameService();

    const spacesName = await listSpacesNameService.execute();

    return response.json(spacesName);
  }
}
