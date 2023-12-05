import { AppDataSource } from "../../../data-source";
import { Agents } from "../../../entity/Agents";
import { Event_occurrences } from "../../../entity/Event_occurrences";
import { Events } from "../../../entity/Events";
import { Projects } from "../../../entity/Projects";
import { Spaces } from "../../../entity/Spaces";
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
  events?: boolean;
  spaces?: boolean;
  eventOcur?: boolean;
  project?: boolean;
  agents?: boolean;
  EventsName?: boolean;
  EventsDescription?: boolean;
  EventsClasEtaria?: boolean;
  EventsOwner?: boolean;
  EventOcurStartsOn?: boolean;
  EventOcurStartsAt?: boolean;
  EventOcurEndsAt?: boolean;
  SpacesName?: boolean;
  SpacesLocation?: boolean;
  SpaceDescription?: boolean;
  SpacesTelefone?: boolean;
  SpacesEmail?: boolean;
  SpacesHorarios?: boolean;
  SpacesTerms?: boolean;
  SpacesParent?: boolean;
  SpacesOwner?: boolean;
  ProjectName?: boolean;
  ProjectDescription?: boolean;
  ProjectRegistrationFrom?: boolean;
  ProjectRegistrationTo?: boolean;
  ProjectParent?: boolean;
  ProjectOwner?: boolean;
  AgentsParent?: boolean;
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
      events,
      spaces,
      eventOcur,
      project,
      agents,
      EventsName,
      EventsDescription,
      EventsClasEtaria,
      EventsOwner,
      EventOcurStartsOn,
      EventOcurStartsAt,
      EventOcurEndsAt,
      SpacesName,
      SpacesLocation,
      SpaceDescription,
      SpacesTelefone,
      SpacesEmail,
      SpacesHorarios,
      SpacesTerms,
      SpacesParent,
      SpacesOwner,
      ProjectName,
      ProjectDescription,
      ProjectRegistrationFrom,
      ProjectRegistrationTo,
      ProjectParent,
      ProjectOwner,
      AgentsParent,
    } = queryParams;

    let queryBuilder = AppDataSource.createQueryBuilder();

    if (events) {
      queryBuilder = queryBuilder.addFrom(Events, "events");
    } else if (spaces) {
      queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    } else if (eventOcur) {
      queryBuilder = queryBuilder.addFrom(Event_occurrences, "event_ocur");
    } else if (project) {
      queryBuilder = queryBuilder.addFrom(Projects, "project");
    } else if (agents) {
      queryBuilder = queryBuilder.addFrom(Agents, "agents");
    }

    if (events) {
      if (project) {
        queryBuilder = queryBuilder.leftJoin(
          "Projects",
          "project",
          "events.project = project.id"
        );
      }
      if (spaces) {
        queryBuilder = queryBuilder.leftJoin(
          "Event_occurrences",
          "event_ocur",
          "events.id = event_ocur.event"
        );
        queryBuilder = queryBuilder.leftJoin(
          "Spaces",
          "spaces",
          "spaces.id = event_ocur.space"
        );
      } else if (eventOcur && !spaces) {
        queryBuilder = queryBuilder.leftJoin(
          "Event_occurrences",
          "event_ocur",
          "events.id = event_ocur.event"
        );
      }
    }

    if (spaces && eventOcur && !events) {
      queryBuilder = queryBuilder.leftJoin(
        "Event_occurrences",
        "event_ocur",
        "spaces.id = event_ocur.space"
      );

      if (project) {
        queryBuilder = queryBuilder.leftJoin(
          "Events",
          "events",
          "events.id = event_ocur.event"
        );
        queryBuilder = queryBuilder.leftJoin(
          "Projects",
          "project",
          "events.project = project.id"
        );
      }
    }

    if (eventOcur && project && !events) {
      queryBuilder = queryBuilder.leftJoin(
        "Events",
        "events",
        "events.id = event_ocur.event"
      );
      queryBuilder = queryBuilder.leftJoin(
        "Projects",
        "project",
        "events.project = project.id"
      );
    }

    if (project && agents && !eventOcur) {
      queryBuilder = queryBuilder.leftJoin(
        "Agents",
        "agentsProject",
        "project.owner = agents.id"
      );
    }

    if (events) {
      if (EventsName) {
        queryBuilder = queryBuilder.addSelect("events.name", "EventsName");
      }

      if (EventsDescription) {
        queryBuilder = queryBuilder.addSelect(
          "events.short_description",
          "EventsDescription"
        );
      }

      if (EventsClasEtaria) {
        queryBuilder = queryBuilder.addSelect(
          "events.classificacao_etaria",
          "EventsClasEtaria"
        );
      }

      if (clas_etaria) {
        queryBuilder = queryBuilder.andWhere(
          "classificacao_etaria = :clas_etaria",
          { clas_etaria }
        );
      }

      if (event_name) {
        queryBuilder = queryBuilder.andWhere("events.name LIKE :event_name", {
          event_name,
        });
      }
    }

    if (spaces) {
      if (SpacesName) {
        queryBuilder = queryBuilder.addSelect("spaces.name", "SpacesName");
      }

      if (SpaceDescription) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.description",
          "SpaceDescription"
        );
      }

      if (SpacesLocation) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.location",
          "SpacesLocation"
        );
      }

      if (SpacesTelefone) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.telefone",
          "SpacesTelefone"
        );
      }

      if (SpacesEmail) {
        queryBuilder = queryBuilder.addSelect("spaces.email", "SpacesEmail");
      }

      if (SpacesHorarios) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.horario",
          "SpacesHorarios"
        );
      }

      if (SpacesTerms) {
        queryBuilder = queryBuilder.addSelect("spaces.terms", "SpacesTerms");
      }

      if (SpacesParent) {
        queryBuilder = queryBuilder.addSelect("spaces.parent", "SpacesParent");
      }

      if (space_name) {
        queryBuilder = queryBuilder.andWhere("spaces.name LIKE :space_name", {
          space_name,
        });
      }
    }

    if (eventOcur) {
      if (EventOcurStartsOn) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.starts_on",
          "EventOcurStartsOn"
        );
      }

      if (EventOcurStartsAt) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.starts_at",
          "EventOcurStartsAt"
        );
      }

      if (EventOcurEndsAt) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.ends_at",
          "EventOcurEndsAt"
        );
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
    }

    if (project) {
      if (ProjectName) {
        queryBuilder = queryBuilder.addSelect("project.name", "ProjectName");
      }

      if (ProjectDescription) {
        queryBuilder = queryBuilder.addSelect(
          "project.short_description",
          "ProjectDescription"
        );
      }

      if (ProjectRegistrationFrom) {
        queryBuilder = queryBuilder.addSelect(
          "project.registration_from",
          "ProjectRegistrationFrom"
        );
      }

      if (ProjectRegistrationTo) {
        queryBuilder = queryBuilder.addSelect(
          "project.registration_to",
          "ProjectRegistrationTo"
        );
      }

      if (ProjectParent) {
        queryBuilder = queryBuilder.addSelect("project.parent", "ProjectParent");
      }

      if (project_name) {
        queryBuilder = queryBuilder.andWhere(
          "project.name LIKE :project_name",
          {
            project_name,
          }
        );
      }
    }

    if (agents) {
      if (AgentsParent) {
        queryBuilder = queryBuilder.addSelect("agents.parent", "AgentsParent");
      }

      if (EventsOwner) {
        queryBuilder = queryBuilder.leftJoin(
          "Agents",
          "agentsEvents",
          "events.owner = agentsEvents.id"
        );
        queryBuilder = queryBuilder.addSelect(
          "agentsEvents.name",
          "EventsOwner"
        );

        if (dono_evento) {
          queryBuilder = queryBuilder.andWhere(
            "agentsEvents.name LIKE :dono_evento",
            {
              dono_evento,
            }
          );
        }
      }

      if (SpacesOwner) {
        queryBuilder = queryBuilder.leftJoin(
          "Agents",
          "agentsSpaces",
          "spaces.owner = agentsSpaces.id"
        );
        queryBuilder = queryBuilder.addSelect(
          "agentsSpaces.name",
          "SpacesOwner"
        );

        if (dono_espaco) {
          queryBuilder = queryBuilder.andWhere(
            "agentsSpaces.name LIKE :dono_espaco",
            {
              dono_espaco,
            }
          );
        }
      }

      if (ProjectOwner) {
        queryBuilder = queryBuilder.addSelect(
          "agentsProject.name",
          "ProjectOwner"
        );
      }

      if (dono_projeto) {
        queryBuilder = queryBuilder.andWhere(
          "agentsProject.name LIKE :dono_projeto",
          {
            dono_projeto,
          }
        );
      }
    }

    const listEvents = await queryBuilder.distinct(true)
    .getRawMany();

    // listEvents = listEvents.map((item: any) => {
    //   return {
    //     event_name: item.name.trim(),
    //     short_description: item.short_description
    //       ? item.short_description.trim()
    //       : null,
    //     classificacao_etaria: item.classificacao_etaria,
    //     starts_on: new Date(item.starts_on).toLocaleDateString("pt-BR", {
    //       day: "2-digit",
    //       month: "2-digit",
    //       year: "numeric",
    //     }),
    //     starts_at: item.starts_at,
    //     ends_at: item.ends_at,
    //     space_name: item.space_name.trim(),
    //     location: item.location,
    //     sd_space: item.sd_space ? item.sd_space.trim() : null,
    //     telefone_espaco: item.telefone_espaco,
    //     email_espaco: item.email_espaco,
    //     horario_funcionamento: item.horario_funcionamento,
    //     project_name: item.project_name ? item.project_name.trim() : null,
    //     project_short_desc: item.project_short_desc,
    //     registration_from: item.registration_from,
    //     registration_to: item.registration_to,
    //     dono_evento: item.dono_evento ? item.dono_evento.trim() : null,
    //     dono_projeto: item.dono_projeto ? item.dono_projeto.trim() : null,
    //     dono_espaco: item.dono_espaco ? item.dono_espaco.trim() : null,
    //     terms: item.terms,
    //     parent_space: item.parent_space,
    //     parent_project: item.parent_project,
    //     parent_agent: item.parent_agent,
    //   };
    // });

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: "src/modules/viewProdutor/Usuario_comum.csv",
      header: Object.keys(listEvents[0])
      .map((key) => ({
        id: key,
        title: key,
      })),
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
