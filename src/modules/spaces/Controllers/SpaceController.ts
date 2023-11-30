import { Request, Response } from "express";
import ListSpaceNameService from "../Services/ListSpaceNameService";

export class SpaceController {
  async findAllNames(request: Request, response: Response): Promise<Response> {
    const listspaceNameService = new ListSpaceNameService();

    const spaceName = await listspaceNameService.execute();

    return response.json(spaceName);
  }
}
