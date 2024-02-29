import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mentor } from '../users/panitia/Mentor';
import { Mentee } from '../users/external/Mentee';

@Entity({ name: 'group_okk' })
export class GroupOKK {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  group_name: string;

  @OneToOne(() => Mentor, (mentor) => mentor.group_okk)
  @JoinColumn() // Set on only one side of relation
  mentor: Mentor;

  @OneToMany(() => Mentee, (mentee) => mentee.group_okk)
  @JoinColumn()
  mentee: Mentee[];
}
