import { DataSource, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("events.name", "name")
      .addSelect("events.short_description", "short_description")
      .addSelect("events.classificacao_etaria", "classificacao_etaria")
      .addSelect("event_occurrences.starts_on", "starts_on")
      .addSelect("event_occurrences.starts_at", "starts_at")
      .addSelect("event_occurrences.ends_at", "ends_at")
      .addSelect("spaces.name", "space_name")
      .addSelect("spaces.location", "location")
      .addSelect("spaces.short_description", "sd_space")
      .addSelect("spaces.telefone", "telefone_espaco")
      .addSelect("spaces.email", "email_espaco")
      .addSelect("spaces.horario", "horario_funcionamento")
      .addSelect("projects.name", "project_name")
      .addSelect("projects.short_description", "project_short_desc")
      .addSelect("projects.registration_from", "registration_from")
      .addSelect("projects.registration_to", "registration_to")
      .addSelect("agents.name", "dono_evento")
      .addSelect("asp.name", "dono_espaco")
      .addSelect("apj.name", "dono_projeto")
      .addSelect("spaces.terms", "terms")
      .addSelect("spp.name", "parent_space")
      .addSelect("prp.name", "parent_project")
      .addSelect("agp.name", "parent_agent")
      .from("Events", "events")
      .innerJoin(
        "Event_occurrences",
        "event_occurrences",
        "events.id = event_occurrences.event_id"
      )
      .innerJoin("Spaces", "spaces", "spaces.id = event_occurrences.space_id")
      .leftJoin("Projects", "projects", "projects.id = events.project_id")
      .leftJoin("Agents", "agents", "agents.id = projects.owner_id")
      .leftJoin("Agents", "asp", "asp.id = spaces.owner_id")
      .leftJoin("Agents", "apj", "apj.id = projects.owner_id")
      .leftJoin("Spaces", "spp", "spp.id = spaces.parent_id")
      .leftJoin("Projects", "prp", "prp.id = projects.parent_id")
      .leftJoin("Agents", "agp", "agp.id = agents.parent_id"),
})
export default class View_produtor {
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

  @ViewColumn()
  sd_space: string;

  @ViewColumn()
  telefone_espaco: string;

  @ViewColumn()
  email_espaco: string;

  @ViewColumn()
  horario_funcionamento: string;

  @ViewColumn()
  project_name: string;

  @ViewColumn()
  project_short_desc: string;

  @ViewColumn()
  registration_from: Date;

  @ViewColumn()
  registration_to: Date;

  @ViewColumn()
  dono_evento: string;

  @ViewColumn()
  dono_espaco: string;

  @ViewColumn()
  dono_projeto: string;

  @ViewColumn()
  terms: string;

  @ViewColumn()
  parent_space: string;

  @ViewColumn()
  parent_project: string;

  @ViewColumn()
  parent_agent: string;
}
