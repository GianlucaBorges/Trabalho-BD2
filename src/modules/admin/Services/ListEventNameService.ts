import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface IEventName {
  name: string;
}

export default class ListEventNameService {
  public async execute(): Promise<IEventName[]> {
    let listEventName: any = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listEventName = listEventName.map((item: any) => {
      return {
        name: item.name.trim(),
      };
    });

    return listEventName;
  }
}
