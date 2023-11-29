import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface IClassificacaoEtaria {
  classificacao_etaria: string;
}

export default class ListClassificacaoEtariaService {
  public async execute(): Promise<IClassificacaoEtaria[]> {
    console.log(AppDataSource)
    let listClassificacaoEtaria = await AppDataSource.getRepository(View_common_user)
      .createQueryBuilder('view_common_user')
      .select('classificacao_etaria')
      .orderBy('classificacao_etaria', 'ASC')
      .distinct(true)
      .getRawMany();
    
    listClassificacaoEtaria = listClassificacaoEtaria.filter((item) => {
      return item.classificacao_etaria !== null;
    });

    return listClassificacaoEtaria;
  }
}
