import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface IQueryParams {
  classificacao_etaria?: string;
  event_name?: string;
  space_name?: string;
  starts_on?: Date; 
}

export default class ListEventsByFiltersService {
  public async execute(queryParams: IQueryParams): Promise<View_common_user[]> {
    const { classificacao_etaria, event_name, space_name, starts_on } = queryParams;
    let queryBuilder = AppDataSource.getRepository(View_common_user)
      .createQueryBuilder('view_common_user')
      .orderBy('starts_on', 'ASC');

    if (classificacao_etaria) {
      queryBuilder = queryBuilder.andWhere('classificacao_etaria = :classificacao_etaria', { classificacao_etaria });
    }

    if (event_name) {
      queryBuilder = queryBuilder.andWhere('name LIKE :event_name', { event_name });
    }

    if (space_name) {
      queryBuilder = queryBuilder.andWhere('space_name LIKE :space_name', { space_name });
    }

    if (starts_on) {
      queryBuilder = queryBuilder.andWhere('starts_on >= :starts_on', { starts_on });
    }

    let listEvents = await queryBuilder.getMany();

    listEvents = listEvents.filter((item) => {
      if (item.classificacao_etaria !== null) {
        return item;
      }
    });

    listEvents.forEach((item) => {
      return {
        "classificacao_etaria": item.classificacao_etaria,
        "event_name": item.name.trim(),
        "space_name": item.space_name.trim(),
        "starts_on": item.starts_on,
      }
    });

    return listEvents;
  }
}
