import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface ISpaceName {
  name: string;
}

export default class ListSpaceNameService {
  public async execute(): Promise<ISpaceName[]> {
    let listSpaceName = await AppDataSource.getRepository(View_common_user)
      .createQueryBuilder("view_common_user")
      .select("space_name")
      .orderBy("space_name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpaceName.forEach((item) => {
      return (item.space_name = item.space_name.trim());
    });

    return listSpaceName;
  }
}
