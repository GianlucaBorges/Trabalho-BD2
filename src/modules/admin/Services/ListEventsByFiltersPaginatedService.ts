import { AppDataSource } from "../../../data-source";
import { Agents } from "../../../entity/Agents";
import { Event_occurrences } from "../../../entity/Event_occurrences";
import { Events } from "../../../entity/Events";
import { Projects } from "../../../entity/Projects";
import { Spaces } from "../../../entity/Spaces";

interface IQueryParams {
  page?: number;
  per_page?: number;
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
  EventsId?: boolean;
  EventsName?: boolean;
  EventsDescription?: boolean;
  EventsCreateTSP?: boolean;
  EventsUpdateTSP?: boolean;
  EventsClasEtaria?: boolean;
  EventsOwner?: boolean;
  EventsProject?: boolean;
  EventOcurId?: boolean;
  EventOcurStartsOn?: boolean;
  EventOcurStartsAt?: boolean;
  EventOcurEndsAt?: boolean;
  EventOcurFrequency?: boolean;
  EventOcurSeparation?: boolean;
  EventOcurEvent?: boolean;
  EventOcurSpace?: boolean;
  SpacesId?: boolean;
  SpacesName?: boolean;
  SpacesLocation?: boolean;
  SpacesDescription?: boolean;
  SpacesCreateTSP?: boolean;
  SpacesUpdateTSP?: boolean;
  SpacesEventOcur?: boolean;
  SpacesTelefone?: boolean;
  SpacesEmail?: boolean;
  SpacesHorarios?: boolean;
  SpacesChildren?: boolean;
  SpacesTerms?: boolean;
  SpacesParent?: boolean;
  SpacesOwner?: boolean;
  ProjectId?: boolean;
  ProjectName?: boolean;
  ProjectDescription?: boolean;
  ProjectCreateTSP?: boolean;
  ProjectUpdateTSP?: boolean;
  ProjectRegistrationFrom?: boolean;
  ProjectRegistrationTo?: boolean;
  ProjectParent?: boolean;
  ProjectChildren?: boolean;
  ProjectOwner?: boolean;
  ProjectEvents?: boolean;
  AgentsId?: boolean;
  AgentsName?: boolean;
  AgentsCreateTSP?: boolean;
  AgentsUpdateTSP?: boolean;
  AgentsParent?: boolean;
  AgentsTerms?: boolean;
  AgentsChildren?: boolean;
  AgentsSpaces?: boolean;
  AgentsEvents?: boolean;
  AgentsProjects?: boolean;
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
      EventsId,
      EventsName,
      EventsDescription,
      EventsCreateTSP,
      EventsUpdateTSP,
      EventsClasEtaria,
      EventsOwner,
      EventsProject,
      EventOcurId,
      EventOcurStartsOn,
      EventOcurStartsAt,
      EventOcurEndsAt,
      EventOcurFrequency,
      EventOcurSeparation,
      EventOcurEvent,
      EventOcurSpace,
      SpacesId,
      SpacesName,
      SpacesLocation,
      SpacesDescription,
      SpacesCreateTSP,
      SpacesUpdateTSP,
      SpacesEventOcur,
      SpacesTelefone,
      SpacesEmail,
      SpacesHorarios,
      SpacesChildren,
      SpacesTerms,
      SpacesParent,
      SpacesOwner,
      ProjectId,
      ProjectName,
      ProjectDescription,
      ProjectCreateTSP,
      ProjectUpdateTSP,
      ProjectRegistrationFrom,
      ProjectRegistrationTo,
      ProjectParent,
      ProjectChildren,
      ProjectOwner,
      ProjectEvents,
      AgentsId,
      AgentsName,
      AgentsCreateTSP,
      AgentsUpdateTSP,
      AgentsParent,
      AgentsTerms,
      AgentsChildren,
      AgentsSpaces,
      AgentsEvents,
      AgentsProjects,
    } = queryParams;

    let queryBuilder = AppDataSource.createQueryBuilder()
      .offset((page - 1) * per_page)
      .limit(per_page);

    if (events) {
      queryBuilder = queryBuilder.addFrom(Events, "events");
    } else if (spaces) {
      queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    } else if (eventOcur) {
      queryBuilder = queryBuilder.addFrom(Event_occurrences, "event_ocur");
    } else if (project) {
      queryBuilder = queryBuilder.addFrom(Projects, "project");
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

    if (eventOcur && project && !events && !spaces) {
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
      if (EventsId) {
        queryBuilder = queryBuilder.addSelect("events.id", "EventsId");
      }

      if (EventsName) {
        queryBuilder = queryBuilder.addSelect("events.name", "EventsName");
      }

      if (EventsDescription) {
        queryBuilder = queryBuilder.addSelect(
          "events.short_description",
          "EventsDescription"
        );
      }

      if (EventsCreateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "events.create_timestamp",
          "EventsCreateTSP"
        );
      }

      if (EventsUpdateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "events.update_timestamp",
          "EventsUpdateTSP"
        );
      }

      if (EventsClasEtaria) {
        queryBuilder = queryBuilder.addSelect(
          "events.classificacao_etaria",
          "EventsClasEtaria"
        );
      }

      if (EventsProject) {
        queryBuilder = queryBuilder.addSelect(
          "events.project",
          "EventsProject"
        );
      }

      if (clas_etaria) {
        queryBuilder = queryBuilder.andWhere(
          "events.classificacao_etaria = :clas_etaria",
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
      if (SpacesId) {
        queryBuilder = queryBuilder.addSelect("spaces.id", "SpacesId");
      }

      if (SpacesName) {
        queryBuilder = queryBuilder.addSelect("spaces.name", "SpacesName");
      }

      if (SpacesDescription) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.short_description",
          "SpacesDescription"
        );
      }

      if (SpacesLocation) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.location",
          "SpacesLocation"
        );
      }

      if (SpacesCreateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.create_timestamp",
          "SpacesCreateTSP"
        );
      }

      if (SpacesUpdateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.update_timestamp",
          "SpacesUpdateTSP"
        );
      }

      if (SpacesEventOcur) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.event_occurrences",
          "SpacesEventOcur"
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

      if (SpacesChildren) {
        queryBuilder = queryBuilder.addSelect(
          "spaces.children",
          "SpacesChildren"
        );
      }

      if (space_name) {
        queryBuilder = queryBuilder.andWhere("spaces.name LIKE :space_name", {
          space_name,
        });
      }
    }

    if (eventOcur) {
      if (EventOcurId) {
        queryBuilder = queryBuilder.addSelect("event_ocur.id", "EventOcurId");
      }

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

      if (EventOcurFrequency) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.frequency",
          "EventOcurFrequency"
        );
      }

      if (EventOcurSeparation) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.separation",
          "EventOcurSeparation"
        );
      }

      if (EventOcurEvent) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.event",
          "EventOcurEvent"
        );
      }

      if (EventOcurSpace) {
        queryBuilder = queryBuilder.addSelect(
          "event_ocur.space",
          "EventOcurSpace"
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
      if (ProjectId) {
        queryBuilder = queryBuilder.addSelect("project.id", "ProjectId");
      }

      if (ProjectName) {
        queryBuilder = queryBuilder.addSelect("project.name", "ProjectName");
      }

      if (ProjectDescription) {
        queryBuilder = queryBuilder.addSelect(
          "project.short_description",
          "ProjectDescription"
        );
      }

      if (ProjectCreateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "project.create_timestamp",
          "ProjectCreateTSP"
        );
      }

      if (ProjectUpdateTSP) {
        queryBuilder = queryBuilder.addSelect(
          "project.update_timestamp",
          "ProjectUpdateTSP"
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
        queryBuilder = queryBuilder.addSelect(
          "project.parent",
          "ProjectParent"
        );
      }

      if (ProjectChildren) {
        queryBuilder = queryBuilder.addSelect(
          "project.children",
          "ProjectChildren"
        );
      }

      if (ProjectEvents) {
        queryBuilder = queryBuilder.addSelect(
          "project.events",
          "ProjectEvents"
        );
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
      if (
        !EventsOwner &&
        !SpacesOwner &&
        !ProjectOwner &&
        !events &&
        !spaces &&
        !project
      ) {
        queryBuilder.addFrom(Agents, "agents");

        if (AgentsName) {
          queryBuilder = queryBuilder.addSelect("agents.name", "AgentsName");
        }
        if (AgentsId) {
          queryBuilder = queryBuilder.addSelect("agents.id", "AgentsId");
        }
        if (AgentsCreateTSP) {
          queryBuilder = queryBuilder.addSelect(
            "agents.create_timestamp",
            "AgentsCreateTSP"
          );
        }
        if (AgentsUpdateTSP) {
          queryBuilder = queryBuilder.addSelect(
            "agents.update_timestamp",
            "AgentsUpdateTSP"
          );
        }
        if (AgentsParent) {
          queryBuilder = queryBuilder.addSelect(
            "agents.parent",
            "AgentsParent"
          );
        }
        if (AgentsTerms) {
          queryBuilder = queryBuilder.addSelect("agents.terms", "AgentsTerms");
        }
        if (AgentsChildren) {
          queryBuilder = queryBuilder.addSelect(
            "agents.children",
            "AgentsChildren"
          );
        }
        if (AgentsSpaces) {
          queryBuilder = queryBuilder.addSelect(
            "agents.spaces",
            "AgentsSpaces"
          );
        }
        if (AgentsEvents) {
          queryBuilder = queryBuilder.addSelect(
            "agents.events",
            "AgentsEvents"
          );
        }
        if (AgentsProjects) {
          queryBuilder = queryBuilder.addSelect(
            "agents.projects",
            "AgentsProjects"
          );
        }
      }

      if (EventsOwner && events) {
        queryBuilder.addSelect("events.owner", "EventsOwner");
      }

      if (events && AgentsName) {
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

      if (SpacesOwner && spaces) {
        queryBuilder.addSelect("spaces.owner", "SpacesOwner");
      }

      if (spaces && AgentsName) {
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

      if (ProjectOwner && project) {
        queryBuilder.addSelect("project.owner", "ProjectOwner");
      }

      if (project && AgentsName) {
        queryBuilder = queryBuilder.innerJoin(
          "Agents",
          "agentsProject",
          "project.owner = agentsProject.id"
        );
        queryBuilder = queryBuilder.addSelect(
          "agentsProject.name",
          "ProjectOwner"
        );

        if (dono_projeto) {
          queryBuilder = queryBuilder.andWhere(
            "agentsProject.name LIKE :dono_projeto",
            {
              dono_projeto,
            }
          );
        }
      }

      if (AgentsId) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "events.owner",
            "EventsAgentsId"
          );
        }

        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "spaces.owner",
            "SpacesAgentsId"
          );
        }

        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "project.owner",
            "ProjectsAgentsId"
          );
        }
      }

      if (AgentsCreateTSP) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.create_timestamp",
            "AgentsCreateTSP"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.create_timestamp",
            "AgentsCreateTSP"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.create_timestamp",
            "AgentsCreateTSP"
          );
        }
      }

      if (AgentsUpdateTSP) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.update_timestamp",
            "AgentsUpdateTSP"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.update_timestamp",
            "AgentsUpdateTSP"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.update_timestamp",
            "AgentsUpdateTSP"
          );
        }
      }

      if (AgentsParent) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.parent",
            "AgentsParent"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.parent",
            "AgentsParent"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.parent",
            "AgentsParent"
          );
        }
      }

      if (AgentsTerms) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.terms",
            "AgentsTerms"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.terms",
            "AgentsTerms"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.terms",
            "AgentsTerms"
          );
        }
      }

      if (AgentsChildren) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.children",
            "AgentsChildren"
          );
        }

        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.children",
            "AgentsChildren"
          );
        }

        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.children",
            "AgentsChildren"
          );
        }
      }

      if (AgentsSpaces) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.spaces",
            "AgentsSpaces"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.spaces",
            "AgentsSpaces"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.spaces",
            "AgentsSpaces"
          );
        }
      }

      if (AgentsEvents) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.events",
            "AgentsEvents"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.events",
            "AgentsEvents"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.events",
            "AgentsEvents"
          );
        }
      }

      if (AgentsProjects) {
        if (events) {
          queryBuilder = queryBuilder.addSelect(
            "agentsEvents.projects",
            "AgentsProjects"
          );
        }
        if (spaces) {
          queryBuilder = queryBuilder.addSelect(
            "agentsSpaces.projects",
            "AgentsProjects"
          );
        }
        if (project) {
          queryBuilder = queryBuilder.addSelect(
            "agentsProject.projects",
            "AgentsProjects"
          );
        }
      }
    }

    let listEvents: any = await queryBuilder.distinct(true).getRawMany();

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
