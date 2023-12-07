import { AppDataSource } from "../../../data-source";
import { Events } from "../../../entity/Events";

interface IEventsName {
  name: string;
}

export default class ListEventsNameService {
  public async execute(): Promise<IEventsName[]> {
    let listEventName = await AppDataSource.getRepository(Events)
      .createQueryBuilder("events")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listEventName = listEventName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listEventName;
  }
}
