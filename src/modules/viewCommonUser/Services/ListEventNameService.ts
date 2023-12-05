import { AppDataSource } from "../../../data-source";
import { Events } from "../../../entity/Events";

interface IEventName {
  name: string;
}

export default class ListEventNameService {
  public async execute(): Promise<IEventName[]> {
    let listEventName = await AppDataSource.getRepository(Events)
      .createQueryBuilder("events")
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
