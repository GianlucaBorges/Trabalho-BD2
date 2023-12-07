import { AppDataSource } from "../../../data-source";
import { Agents } from "../../../entity/Agents";
import { Event_occurrences } from "../../../entity/Event_occurrences";
import { Events } from "../../../entity/Events";
import { Projects } from "../../../entity/Projects";
import { Spaces } from "../../../entity/Spaces";
import View_produtor from "../../../entity/View_produtor";

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
  AgentsName?: boolean;
}

export default class ListEventsByFiltersService {
  public async execute(queryParams: IQueryParams): Promise<View_produtor[]> {
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
      AgentsName,
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
        queryBuilder = queryBuilder.innerJoin(
          "Projects",
          "project",
          "events.project = project.id"
        );
      }
      if (spaces) {
        queryBuilder = queryBuilder.innerJoin(
          "Event_occurrences",
          "event_ocur",
          "events.id = event_ocur.event"
        );
        queryBuilder = queryBuilder.innerJoin(
          "Spaces",
          "spaces",
          "spaces.id = event_ocur.space"
        );
      } else if (eventOcur && !spaces) {
        queryBuilder = queryBuilder.innerJoin(
          "Event_occurrences",
          "event_ocur",
          "events.id = event_ocur.event"
        );
      }
    }

    if (spaces && eventOcur && !events) {
      queryBuilder = queryBuilder.innerJoin(
        "Event_occurrences",
        "event_ocur",
        "spaces.id = event_ocur.space"
      );

      if (project) {
        queryBuilder = queryBuilder.innerJoin(
          "Events",
          "events",
          "events.id = event_ocur.event"
        );
        queryBuilder = queryBuilder.innerJoin(
          "Projects",
          "project",
          "events.project = project.id"
        );
      }
    }

    if (eventOcur && project && !events) {
      queryBuilder = queryBuilder.innerJoin(
        "Events",
        "events",
        "events.id = event_ocur.event"
      );
      queryBuilder = queryBuilder.innerJoin(
        "Projects",
        "project",
        "events.project = project.id"
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
      if (AgentsName && !EventsOwner && !SpacesOwner && !ProjectOwner) {
        queryBuilder = queryBuilder.addSelect("agents.name", "AgentsName");
      }

      if (EventsOwner && !AgentsName) {
        queryBuilder.addSelect("events.owner", "EventsOwner");
      }

      if (EventsOwner && AgentsName) {
        queryBuilder = queryBuilder.innerJoin(
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

      if (SpacesOwner && !AgentsName) {
        queryBuilder.addSelect("spaces.owner", "SpacesOwner");
      }

      if (SpacesOwner && AgentsName) {
        queryBuilder = queryBuilder.innerJoin(
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

      if (ProjectOwner && !AgentsName) {
        queryBuilder.addSelect("projects.owner", "ProjectOwner");
      }

      if (ProjectOwner && AgentsName) {
        queryBuilder = queryBuilder.innerJoin(
          "Agents",
          "agentsProject",
          "project.owner = agentsProject.id"
        );
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

    let listEvents: any = await queryBuilder.distinct(true)
    .getRawMany();

    return listEvents;
  }
}
