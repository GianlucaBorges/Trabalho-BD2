import { AppDataSource } from "../../../data-source";
import { Spaces } from "../../../entity/Spaces";

interface ISpacesName {
  name: string;
}

export default class ListSpacesNameService {
  public async execute(): Promise<ISpacesName[]> {
    let listSpacesName = await AppDataSource.getRepository(Spaces)
      .createQueryBuilder("spaces")
      .select("name")
      .orderBy("name", "ASC")
      .distinct(true)
      .getRawMany();

    listSpacesName = listSpacesName.map((item) => {
      return {
        name: item.name,
      };
    });

    return listSpacesName;
  }
}
