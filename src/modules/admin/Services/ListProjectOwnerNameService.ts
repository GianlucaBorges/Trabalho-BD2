import { AppDataSource } from "../../../data-source";
import { Projects } from "../../../entity/Projects";

interface IProjectOwnerName {
  name: string;
}

export default class ListProjectOwnerNameService {
  public async execute(): Promise<IProjectOwnerName[]> {
    let listProjectOwnerName = await AppDataSource.getRepository(Projects)
      .createQueryBuilder("projects")
      .innerJoin("Agents", "agents", "agents.id = projects.owner")
      .select("agents.name", "name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectOwnerName = listProjectOwnerName.map((item) => {
      if (item.name !== null) {
        return {
          name: item.name.trim(),
        };
      }
    });

    return listProjectOwnerName;
  }
}
