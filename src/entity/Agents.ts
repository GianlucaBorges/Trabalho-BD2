import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Events } from "./Events";
import { Projects } from "./Projects";
import { Spaces } from "./Spaces";

@Entity()
export class Agents {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  create_timestamp: Date;

  @UpdateDateColumn({ nullable: true })
  update_timestamp: Date;

  @Column({ nullable: true })
  @OneToMany(() => Agents, (agent) => agent.id)
  @JoinColumn({ name: "parent_id" })
  parent: number;

  @Column({ nullable: true })
  terms: string;

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Agents, (agent) => agent.id)
  children: number[];

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Spaces, (space) => space.id)
  spaces: number[];

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Events, (event) => event.id)
  events: number[];

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Projects, (project) => project.id)
  projects: number[];
}
