import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../User';
import { GroupOKK } from 'src/entities/other/GroupOKK';
import { Mentee } from '../external/Mentee';
import { MainRole } from '../types/entity.types';

@Entity({ name: 'mentor' })
export class Mentor extends User {
  @Column({ nullable: true, default: MainRole.MENTOR })
  role: MainRole.MENTOR;

  @Column('simple-array', { nullable: true })
  interests?: string[];

  // Group column doesn't need to be define JOIN COLUMN
  @OneToOne(() => GroupOKK, (groupOKK) => groupOKK.mentor, { nullable: true })
  group_okk?: GroupOKK;

  @OneToMany(() => Mentee, (mentee) => mentee.mentor, { nullable: true })
  @JoinColumn()
  mentee?: Mentee[];
}
