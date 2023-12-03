import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface IEventName {
  name: string;
}

export default class ListEventNameService {
  public async execute(): Promise<IEventName[]> {
    let listEventName = await AppDataSource.getRepository(View_common_user)
      .createQueryBuilder("view_common_user")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listEventName = listEventName.map((item) => {
      return {
        name: item.name.trim(),
      };
    });

    return listEventName;
  }
}
