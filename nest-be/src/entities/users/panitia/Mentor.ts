import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../User';
import { Mentee } from '../external/Mentee';

@Entity({ name: 'mentor' })
export class Mentor extends User {
  @Column('simple-array')
  interests?: string[];
  @OneToMany(() => Mentee, (mentee) => mentee.mentor, { nullable: true })
  mentee?: Mentee[];
}
