import { AppDataSource } from "../../../data-source";
import { Spaces } from "../../../entity/Spaces";

interface ISpaceOwnerName {
  name: string;
}

export default class ListSpaceOwnerNameService {
  public async execute(): Promise<ISpaceOwnerName[]> {
    let listSpaceOwnerName = await AppDataSource.getRepository(Spaces)
    .createQueryBuilder("spaces")
    .innerJoin("Agents", "agents", "agents.id = spaces.owner")
    .select("agents.name", "name")
    .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpaceOwnerName = listSpaceOwnerName.map((item) => {
      if (item.name !== null) {
        return {
          name: item.name,
        }
      }
    });

    return listSpaceOwnerName;
  }
}
