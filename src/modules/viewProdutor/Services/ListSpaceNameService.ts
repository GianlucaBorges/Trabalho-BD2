import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface ISpaceName {
  name: string;
}

export default class ListSpaceNameService {
  public async execute(): Promise<ISpaceName[]> {
    let listSpaceName = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("space_name")
      .orderBy("space_name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpaceName = listSpaceName.map((item) => {
      return {
        name: item.space_name.trim(),
      };
    });

    return listSpaceName;
  }
}
