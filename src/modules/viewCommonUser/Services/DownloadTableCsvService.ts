import { AppDataSource } from "../../../data-source";
import View_common_user from "../../../entity/View_common_user";
import AppError from "../../../errors/AppError";

interface IQueryParams {
  classificacao_etaria?: string;
  event_name?: string;
  space_name?: string;
  data_inicio?: Date;
  data_fim?: Date;
}

export default class DownloadTableCsvService {
  public async execute(queryParams: IQueryParams): Promise<string> {
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

    let listEvents: any = await queryBuilder.getMany();

    listEvents = listEvents.map((item: any) => {
      return {
        event_name: item.name.trim(),
        short_description: item.short_description
          ? item.short_description.trim()
          : null,
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

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: "src/modules/viewCommonUser/Services/Events.csv",
      header: [
        { id: "event_name", title: "Nome do Evento" },
        { id: "short_description", title: "Descrição curta" },
        { id: "classificacao_etaria", title: "Classificação Etária" },
        { id: "starts_on", title: "Data" },
        { id: "starts_at", title: "Horário de início" },
        { id: "ends_at", title: "Horário de Fim" },
        { id: "space_name", title: "Nome do Espaço" },
        { id: "location", title: "Local" },
      ],
    });

    await csvWriter
      .writeRecords(listEvents)
      .then(() => {
        console.log("...Done");
      })
      .catch((err: Error) => {
        console.log(err);
        throw new AppError("Erro ao gerar arquivo CSV", 500);
      });

    return csvWriter.fileWriter.path;
  }
}
