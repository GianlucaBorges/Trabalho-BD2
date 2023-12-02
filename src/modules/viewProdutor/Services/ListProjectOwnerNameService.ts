import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface IProjectOwnerName {
  name: string;
}

export default class ListProjectOwnerNameService {
  public async execute(): Promise<IProjectOwnerName[]> {
    let listProjectOwnerName = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("dono_projeto")
      .orderBy("dono_projeto", "ASC")
      .distinct(true)
      .getRawMany();

    listProjectOwnerName.forEach((item) => {
      if (item.dono_projeto !== null) {
        return (item.dono_projeto = item.dono_projeto.trim());
      }
    });

    return listProjectOwnerName;
  }
}
