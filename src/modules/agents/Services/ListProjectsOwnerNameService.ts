import { AppDataSource } from "../../../data-source";
import { Projects } from "../../../entity/Projects";

interface IProjectsOwnerName {
  name: string;
}

export default class ListProjectsOwnerNameService {
  public async execute(): Promise<IProjectsOwnerName[]> {
    let listProjectsOwnerName = await AppDataSource.getRepository(Projects)
      .createQueryBuilder("projects")
      .innerJoin("Agents", "agents", "agents.id = projects.owner")
      .select("agents.name", "name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectsOwnerName = listProjectsOwnerName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listProjectsOwnerName;
  }
}
