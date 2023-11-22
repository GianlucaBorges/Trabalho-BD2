import { DataSource, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => dataSource
    .createQueryBuilder()
    .select("events.name", "name")
    .addSelect("events.short_description", "short_description")
    .addSelect("events.classificacao_etaria", "classificacao_etaria")
    .addSelect("event_occurrences.starts_on", "starts_on")
    .addSelect("event_occurrences.starts_at", "starts_at")
    .addSelect("event_occurrences.ends_at", "ends_at")
    .addSelect("spaces.name", "space_name")
    .addSelect("spaces.location", "location")
    .from("Events", "events")
    .innerJoin("Event_occurrences", "event_occurrences", "events.id = event_occurrences.event_id")
    .innerJoin("Spaces", "spaces", "spaces.id = event_occurrences.space_id")
    .leftJoin("Projects", "projects", "projects.id = events.project_id")
})

export default class View_commin_user {
  @ViewColumn()
  name: string;

  @ViewColumn()
  short_description: string;

  @ViewColumn()
  classificacao_etaria: string;

  @ViewColumn()
  starts_on: Date;

  @ViewColumn()
  starts_at: string;

  @ViewColumn()
  ends_at: string;

  @ViewColumn()
  space_name: string;

  @ViewColumn()
  location: string;
}