import { AppDataSource } from "../../../data-source";
import { Projects } from "../../../entity/Projects";

interface IProjectName {
  name: string;
}

export default class ListProjectNameService {
  public async execute(): Promise<IProjectName[]> {
    let listProjectName = await AppDataSource.getRepository(Projects)
      .createQueryBuilder("projects")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectName = listProjectName.map((item) => {
      if (item.name !== null) {
        return {
          name: item.name,
        }
      }
    });

    return listProjectName;
  }
}
