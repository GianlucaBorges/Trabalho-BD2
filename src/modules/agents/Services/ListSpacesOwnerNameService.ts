import { AppDataSource } from "../../../data-source";
import { Spaces } from "../../../entity/Spaces";

interface ISpacesOwnerName {
  name: string;
}

export default class ListSpacesOwnerNameService {
  public async execute(): Promise<ISpacesOwnerName[]> {
    let listSpacesOwnerName = await AppDataSource.getRepository(Spaces)
      .createQueryBuilder("spaces")
      .innerJoin("Agents", "agents", "agents.id = spaces.owner")
      .select("agents.name", "name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpacesOwnerName = listSpacesOwnerName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listSpacesOwnerName;
  }
}
