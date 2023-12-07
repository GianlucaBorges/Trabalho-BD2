import { AppDataSource } from "../../../data-source";
import { Event_occurrences } from "../../../entity/Event_occurrences";
import { Events } from "../../../entity/Events";
import { Spaces } from "../../../entity/Spaces";

interface IQueryParams {
  page?: number;
  per_page?: number;
  clas_etaria?: string;
  event_name?: string;
  space_name?: string;
  data_inicio?: Date;
  data_fim?: Date;
  events?: boolean;
  spaces?: boolean;
  eventOcur?: boolean;
  EventsName?: boolean;
  EventsDescription?: boolean;
  EventsClasEtaria?: boolean;
  EventOcurStartsOn?: boolean;
  EventOcurStartsAt?: boolean;
  EventOcurEndsAt?: boolean;
  SpacesName?: boolean;
  SpaceDescription?: boolean;
  SpacesLocation?: boolean;
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
      data_inicio,
      data_fim,
      events,
      spaces,
      eventOcur,
      EventsName,
      EventsDescription,
      EventsClasEtaria,
      EventOcurStartsOn,
      EventOcurStartsAt,
      EventOcurEndsAt,
      SpacesName,
      SpaceDescription,
      SpacesLocation,
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
    }

    if (events) {
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

    const listEvents = await queryBuilder.distinct(true).getRawMany();

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
