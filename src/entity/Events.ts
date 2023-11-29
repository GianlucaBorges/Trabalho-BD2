import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Agents } from "./Agents";
import { Projects } from "./Projects";

@Entity()
export class Events {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  short_description: string;

  @CreateDateColumn()
  create_timestamp: Date;

  @UpdateDateColumn({ nullable: true })
  update_timestamp: Date;

  @Column({ nullable: true })
  classificacao_etaria: string;

  @Column({ nullable: true })
  @OneToMany(() => Agents, (agent) => agent.id)
  @JoinColumn({ name: "owner_id" })
  owner: string;

  @Column({ nullable: true })
  @OneToMany(() => Projects, (project) => project.id)
  @JoinColumn({ name: "project_id" })
  project: number;
}
