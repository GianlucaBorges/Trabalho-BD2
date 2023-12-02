import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";

interface IClassificacaoEtaria {
  classificacao_etaria: string;
}

export default class ListClassificacaoEtariaService {
  public async execute(): Promise<IClassificacaoEtaria[]> {
    let listClassificacaoEtaria = await AppDataSource.getRepository(
      View_produtor
    )
      .createQueryBuilder("view_produtor")
      .select("classificacao_etaria")
      .orderBy("classificacao_etaria", "ASC")
      .distinct(true)
      .getRawMany();

    listClassificacaoEtaria = listClassificacaoEtaria.filter((item) => {
      return item.classificacao_etaria !== null;
    });

    return listClassificacaoEtaria;
  }
}
