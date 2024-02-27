import { Column, Entity } from 'typeorm';
import { User } from '../User';
import { MainRole } from '../types/entity.types';
import {
  AuthorityLevelPI,
  PengurusIntiRole,
  adminTypes,
} from '../types/pi.types';

@Entity({ name: 'pengurus_inti' })
export class PengurusInti extends User {
  @Column({ type: 'enum', enum: MainRole, default: MainRole.PI })
  role: MainRole = MainRole.PI;

  @Column({ type: 'enum', enum: PengurusIntiRole, nullable: false })
  pi_role: PengurusIntiRole;

  @Column({
    type: 'enum',
    enum: AuthorityLevelPI,
    default: AuthorityLevelPI.NORMAL,
    nullable: true,
  })
  authority_level: AuthorityLevelPI;

  constructor() {
    super();

    if (adminTypes.includes(this.pi_role)) {
      this.authority_level = AuthorityLevelPI.ADMIN;
    } else {
      this.authority_level = AuthorityLevelPI.NORMAL;
    }
  }
}
