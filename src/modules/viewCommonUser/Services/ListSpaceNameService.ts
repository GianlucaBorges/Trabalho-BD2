import { AppDataSource } from "../../../data-source";
import { Spaces } from "../../../entity/Spaces";
import View_common_user from "../../../entity/View_common_user";

interface ISpaceName {
  name: string;
}

export default class ListSpaceNameService {
  public async execute(): Promise<ISpaceName[]> {
    let listSpaceName = await AppDataSource.getRepository(Spaces)
      .createQueryBuilder("spaces")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpaceName = listSpaceName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listSpaceName;
  }
}
