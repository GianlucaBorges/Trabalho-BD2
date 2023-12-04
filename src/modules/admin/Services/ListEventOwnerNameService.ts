import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface IEventOwnerName {
  name: string;
}

export default class ListEventOwnerNameService {
  public async execute(): Promise<IEventOwnerName[]> {
    let listEventOwnerName = await AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .select("dono_evento")
      .orderBy("dono_evento", "ASC")
      .distinct(true)
      .getRawMany();

    listEventOwnerName = listEventOwnerName.map((item) => {
      if (item.dono_evento !== null) {
        return {
          name: item.dono_evento.trim(),
        }
      }
    });

    return listEventOwnerName;
  }
}
