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
import { Agents } from "./Agents";
import { Events } from "./Events";

@Entity()
export class Projects {
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
  registration_from: Date;

  @Column({ nullable: true })
  registration_to: Date;

  @Column({ nullable: true })
  @OneToMany(() => Projects, (project) => project.id)
  @JoinColumn({ name: "parent_id" })
  parent: number;

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Projects, (project) => project.id)
  children: number[];

  @Column({ nullable: true })
  @OneToMany(() => Agents, (agent) => agent.id)
  @JoinColumn({ name: "owner_id" })
  owner: string;

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Events, (event) => event.id)
  events: number[];
}
