import {
  Column,
  Entity,
  JoinColumn,
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
  group_number: number;

  @OneToOne(() => Mentor)
  @JoinColumn() // Set on only one side of relation
  mentor: Mentor;

  @OneToOne(() => Mentee)
  @JoinColumn()
  mentee: Mentee;
}
