import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";

interface IQueryParams {
  page?: number;
  per_page?: number;
  classificacao_etaria?: string;
  event_name?: string;
  space_name?: string;
  data_inicio?: Date;
  data_fim?: Date;
}

interface IResponse {
  _metadata: {
    page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
  records: any[];
}

export default class ListEventsByFiltersPaginatedService {
  public async execute(queryParams: IQueryParams): Promise<IResponse> {
    const {
      page,
      per_page,
      classificacao_etaria,
      event_name,
      space_name,
      data_inicio,
      data_fim,
    } = queryParams;
    let queryBuilder = AppDataSource.getRepository(View_common_user)
      .createQueryBuilder("view_common_user")
      .skip((page - 1) * per_page)
      .take(per_page)

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

    queryBuilder.orderBy("starts_on", "DESC");
    let listEvents: any = await queryBuilder.getMany();

    listEvents = listEvents.map((item: any) => {
      return {
        event_name: item.name.trim(),
        short_description: (item.short_description) ? item.short_description.trim() : null,
        classificacao_etaria: item.classificacao_etaria,
        starts_on: new Date(item.starts_on).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        starts_at: item.starts_at,
        ends_at: item.ends_at,
        space_name: item.space_name.trim(),
        location: item.location,
      };
    });

    const count = await queryBuilder.getCount();

    const total_pages = Math.ceil(count / per_page);

    const response: IResponse = {
      _metadata: {
        page,
        per_page,
        total_pages,
        total_count: count,
      },
      records: listEvents,
    };

    return response;
  }
}
