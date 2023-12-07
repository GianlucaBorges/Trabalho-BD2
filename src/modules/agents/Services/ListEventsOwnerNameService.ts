import { AppDataSource } from "../../../data-source";
import { Events } from "../../../entity/Events";

interface IOwnerEventsName {
  name: string;
}

export default class ListEventsOwnerService {
  public async execute(): Promise<IOwnerEventsName[]> {
    let listEventsName = await AppDataSource.getRepository(Events)
      .createQueryBuilder("events")
      .innerJoin("Agents", "agents", "agents.id = events.owner")
      .select("agents.name", "name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listEventsName = listEventsName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listEventsName;
  }
}
