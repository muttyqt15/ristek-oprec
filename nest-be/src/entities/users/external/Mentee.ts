import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../User';
import { GroupOKK } from 'src/entities/other/GroupOKK';
import { MainRole } from '../types/entity.types';
import { Mentor } from '../panitia/Mentor';
@Entity({ name: 'mentee' })
export class Mentee extends User {
  @Column()
  jalur_masuk: string; // Could also be an enum

  @Column({ default: MainRole.NON_STAFF, nullable: true })
  role: MainRole.NON_STAFF;

  @ManyToOne(() => GroupOKK, (group) => group.mentee, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  group_okk?: GroupOKK;

  @ManyToOne(() => Mentor, (mentor) => mentor.mentee, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  mentor?: Mentor;
}
