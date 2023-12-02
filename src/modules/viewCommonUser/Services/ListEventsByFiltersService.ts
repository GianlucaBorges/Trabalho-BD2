import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface IQueryParams {
  classificacao_etaria?: string;
  event_name?: string;
  space_name?: string;
  data_inicio?: Date;
  data_fim?: Date;
}

export default class ListEventsByFiltersService {
  public async execute(queryParams: IQueryParams): Promise<View_common_user[]> {
    const {
      classificacao_etaria,
      event_name,
      space_name,
      data_inicio,
      data_fim,
    } = queryParams;
    let queryBuilder = AppDataSource.getRepository(View_common_user)
      .createQueryBuilder("view_common_user")
      .orderBy("starts_on", "DESC");

    if (classificacao_etaria) {
      queryBuilder = queryBuilder.andWhere(
        "classificacao_etaria = :classificacao_etaria",
        { classificacao_etaria }
      );
    }

    if (event_name) {
      queryBuilder = queryBuilder.andWhere("name LIKE :event_name", {
        event_name,
      });
    }

    if (space_name) {
      queryBuilder = queryBuilder.andWhere("space_name LIKE :space_name", {
        space_name,
      });
    }

    if (data_inicio && !data_fim) {
      queryBuilder = queryBuilder.andWhere("starts_on >= :data_inicio", {
        data_inicio,
      });
    }

    if (!data_inicio && data_fim) {
      queryBuilder = queryBuilder.andWhere("starts_on <= :data_fim", {
        data_fim,
      });
    }

    if (data_inicio && data_fim) {
      queryBuilder = queryBuilder.andWhere(
        "starts_on BETWEEN :data_inicio AND :data_fim",
        { data_inicio, data_fim }
      );
    }

    let listEvents = await queryBuilder.getMany();

    listEvents.forEach((item) => {
      return {
        event_name: item.name.trim(),
        short_description: (item.short_description) ? item.short_description.trim() : null,
        classificacao_etaria: item.classificacao_etaria,
        starts_on: item.starts_on,
        starts_at: item.starts_at,
        ends_at: item.ends_at,
        space_name: item.space_name.trim(),
        location: item.location,
      };
    });

    return listEvents;
  }
}
