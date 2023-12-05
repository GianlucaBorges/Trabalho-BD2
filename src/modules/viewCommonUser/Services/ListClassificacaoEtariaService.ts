import { AppDataSource } from "../../../data-source";
import { Events } from "../../../entity/Events";

interface IClassificacaoEtaria {
  classificacao_etaria: string;
}

export default class ListClassificacaoEtariaService {
  public async execute(): Promise<IClassificacaoEtaria[]> {
    let listClassificacaoEtaria = await AppDataSource.getRepository(
      Events
    )
      .createQueryBuilder("events")
      .select("classificacao_etaria")
      .orderBy("classificacao_etaria", "ASC")
      .distinct(true)
      .getRawMany();

    listClassificacaoEtaria = listClassificacaoEtaria.filter((item) => {
      return item.classificacao_etaria !== null;
    });

    listClassificacaoEtaria = listClassificacaoEtaria.map((item) => {
      return {
        name: item.classificacao_etaria,
      };
    });

    return listClassificacaoEtaria;
  }
}
