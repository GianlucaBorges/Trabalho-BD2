import { AppDataSource } from "../../../data-source";
import View_produtor from "../../../entity/View_produtor";
import AppError from "../../../errors/AppError";

interface IQueryParams {
  clas_etaria?: string;
  event_name?: string;
  space_name?: string;
  project_name?: string;
  dono_evento?: string;
  dono_espaco?: string;
  dono_projeto?: string;
  data_inicio?: Date;
  data_fim?: Date;
}

export default class DownloadTableCsvService {
  public async execute(queryParams: IQueryParams): Promise<string> {
    const {
      clas_etaria,
      event_name,
      space_name,
      project_name,
      dono_evento,
      dono_espaco,
      dono_projeto,
      data_inicio,
      data_fim,
    } = queryParams;

    let queryBuilder = AppDataSource.getRepository(View_produtor)
      .createQueryBuilder("view_produtor")
      .orderBy("starts_on", "DESC");

    if (clas_etaria) {
      queryBuilder = queryBuilder.andWhere(
        "classificacao_etaria = :clas_etaria",
        { clas_etaria }
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

    if (project_name) {
      queryBuilder = queryBuilder.andWhere("project_name LIKE :project_name", {
        project_name,
      });
    }

    if (dono_evento) {
      queryBuilder = queryBuilder.andWhere("dono_evento LIKE :dono_evento", {
        dono_evento,
      });
    }

    if (dono_espaco) {
      queryBuilder = queryBuilder.andWhere("dono_espaco LIKE :dono_espaco", {
        dono_espaco,
      });
    }

    if (dono_projeto) {
      queryBuilder = queryBuilder.andWhere("dono_projeto LIKE :dono_projeto", {
        dono_projeto,
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
        sd_space: item.sd_space ? item.sd_space.trim() : null,
        telefone_espaco: item.telefone_espaco,
        email_espaco: item.email_espaco,
        horario_funcionamento: item.horario_funcionamento,
        project_name: item.project_name ? item.project_name.trim() : null,
        project_short_desc: item.project_short_desc,
        registration_from: item.registration_from,
        registration_to: item.registration_to,
        dono_evento: item.dono_evento ? item.dono_evento.trim() : null,
        dono_projeto: item.dono_projeto ? item.dono_projeto.trim() : null,
        dono_espaco: item.dono_espaco ? item.dono_espaco.trim() : null,
        terms: item.terms,
        parent_space: item.parent_space,
        parent_project: item.parent_project,
        parent_agent: item.parent_agent,
      };
    });

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: "src/tabela.csv",
      header: [
        { id: "event_name", title: "Nome do evento" },
        { id: "short_description", title: "Descrição curta" },
        { id: "classificacao_etaria", title: "Classificação etária" },
        { id: "starts_on", title: "Data" },
        { id: "starts_at", title: "Horário de início" },
        { id: "ends_at", title: "Horário de término" },
        { id: "space_name", title: "Nome do espaço" },
        { id: "location", title: "Endereço" },
        { id: "sd_space", title: "SD do espaço" },
        { id: "telefone_espaco", title: "Telefone do espaço" },
        { id: "email_espaco", title: "E-mail do espaço" },
        { id: "horario_funcionamento", title: "Horário de funcionamento" },
        { id: "project_name", title: "Nome do projeto" },
        { id: "project_short_desc", title: "Descrição curta do projeto" },
        { id: "registration_from", title: "Inscrições de" },
        { id: "registration_to", title: "Inscrições até" },
        { id: "dono_evento", title: "Dono do evento" },
        { id: "dono_projeto", title: "Dono do projeto" },
        { id: "dono_espaco", title: "Dono do espaço" },
        { id: "terms", title: "Termos" },
        { id: "parent_space", title: "Espaço pai" },
        { id: "parent_project", title: "Projeto pai" },
        { id: "parent_agent", title: "Agente pai" },
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
