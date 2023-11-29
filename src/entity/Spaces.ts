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

@Entity()
export class Spaces {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  short_description: string;

  @CreateDateColumn()
  create_timestamp: Date;

  @UpdateDateColumn({ nullable: true })
  update_timestamp: Date;

  @Column("int", { nullable: true, array: true })
  event_occurrences: number[];

  @Column({ nullable: true })
  horario: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  email: string;

  @Column("int", { nullable: true, array: true })
  @ManyToOne(() => Spaces, (space) => space.id)
  children: number[];

  @Column({ nullable: true })
  terms: string;

  @Column({ nullable: true })
  @OneToMany(() => Spaces, (space) => space.id)
  @JoinColumn({ name: "parent_id" })
  parent: number;

  @Column({ nullable: true })
  @OneToMany(() => Agents, (agent) => agent.id)
  @JoinColumn({ name: "owner_id" })
  owner: string;
}
