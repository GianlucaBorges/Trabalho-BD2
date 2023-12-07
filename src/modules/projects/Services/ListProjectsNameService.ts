import { AppDataSource } from "../../../data-source";
import { Projects } from "../../../entity/Projects";

interface IProjectsName {
  name: string;
}

export default class ListProjectsNameService {
  public async execute(): Promise<IProjectsName[]> {
    let listProjectsName = await AppDataSource.getRepository(Projects)
      .createQueryBuilder("projects")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectsName = listProjectsName.map((item) => {
      if (item.name !== null) {
        return {
          name: item.name,
        };
      }
    });

    return listProjectsName;
  }
}
