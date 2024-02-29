import { Column, Entity, OneToOne } from 'typeorm';
import { User } from '../User';
import { GroupOKK } from 'src/entities/other/GroupOKK';

@Entity({ name: 'mentor' })
export class Mentor extends User {
  @Column('simple-array', { nullable: true })
  interests?: string[];

  // Group column doesn't need to be define JOIN COLUMN
  @OneToOne(() => GroupOKK, (groupOKK) => groupOKK.mentor)
  group_okk: GroupOKK;

  // @OneToMany(() => Mentee, (mentee) => mentee.mentor, { nullable: true })
  // mentee?: Mentee[];
}
