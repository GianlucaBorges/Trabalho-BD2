import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Events } from "./Events";
import { Spaces } from "./Spaces";

@Entity()
export class Event_occurrences {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  starts_on: Date;

  @Column({ type: "time without time zone", nullable: true })
  starts_at: string;

  @Column({ type: "time without time zone", nullable: true })
  ends_at: string;

  @Column({ type: "text", nullable: true })
  frequency: string;

  @Column({ nullable: true })
  separation: number;

  @Column()
  @OneToOne(() => Events, (event) => event.id)
  @JoinColumn({ name: "event_id" })
  event: number;

  @Column()
  @OneToOne(() => Spaces, (space) => space.id)
  @JoinColumn({ name: "space_id" })
  space: number;
}
