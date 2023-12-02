import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface ISpaceOwnerName {
  name: string;
}

export default class ListSpaceOwnerNameService {
  public async execute(): Promise<ISpaceOwnerName[]> {
    let listSpaceOwnerName = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("dono_espaco")
      .orderBy("dono_espaco", "ASC")
      .distinct(true)
      .getRawMany();

    listSpaceOwnerName.forEach((item) => {
      if (item.dono_espaco !== null) {
        return (item.dono_espaco = item.dono_espaco.trim());
      }
    });

    return listSpaceOwnerName;
  }
}
