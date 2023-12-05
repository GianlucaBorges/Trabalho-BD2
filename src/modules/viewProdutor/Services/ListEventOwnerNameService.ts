import { AppDataSource } from "../../../data-source";
import { Events } from "../../../entity/Events";

interface IOwnerEventName {
  name: string;
}

export default class ListEventNameService {
  public async execute(): Promise<IOwnerEventName[]> {
    let listEventName = await AppDataSource.getRepository(Events)
      .createQueryBuilder("events")
      .innerJoin("Agents", "agents", "agents.id = events.owner")
      .select("agents.name", "name")
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
