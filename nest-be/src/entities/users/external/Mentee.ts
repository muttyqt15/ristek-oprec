import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../User';
import { Mentor } from '../panitia/Mentor';
@Entity({ name: 'mentee' })
export class Mentee extends User {
  @Column()
  jalur_masuk: string; // Could also be an enum
  @ManyToOne(() => Mentor, (mentor) => mentor.mentee, { nullable: true })
  mentor?: Mentor;
}
