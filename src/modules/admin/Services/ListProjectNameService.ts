import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface IProjectName {
  project_name: string;
}

export default class ListProjectNameService {
  public async execute(): Promise<IProjectName[]> {
    let listProjectName = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("project_name")
      .orderBy("project_name", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectName = listProjectName.map((item) => {
      if (item.project_name !== null) {
        return {
          name: item.project_name.trim(),
        }
      }
    });

    return listProjectName;
  }
}
