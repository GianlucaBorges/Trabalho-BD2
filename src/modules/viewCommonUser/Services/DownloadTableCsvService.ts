import { AppDataSource } from "../../../data-source";
import { Event_occurrences } from "../../../entity/Event_occurrences";
import { Events } from "../../../entity/Events";
import { Spaces } from "../../../entity/Spaces";
import AppError from "../../../errors/AppError";

interface IQueryParams {
  classificacao_etaria?: string;
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

export default class ListEventsByFiltersService {
  public async execute(queryParams: IQueryParams): Promise<string> {
    const {
      classificacao_etaria,
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

    let queryBuilder = AppDataSource.createQueryBuilder();

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
        queryBuilder = queryBuilder.andWhere("space_name LIKE :space_name", {
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
    //   };
    // });

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: "src/modules/viewCommonUser/Usuario_comum.csv",
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
