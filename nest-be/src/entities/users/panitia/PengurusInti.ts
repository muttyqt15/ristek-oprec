import { Column, Entity } from 'typeorm';
import { User } from '../User';
import { GlobalAuthorityLevel, MainRole } from '../types/entity.types';
import { PengurusIntiRole } from '../types/pi.types';

@Entity({ name: 'pengurus_inti' })
export class PengurusInti extends User {
  @Column({ type: 'enum', enum: MainRole, default: MainRole.PI })
  role: MainRole = MainRole.PI;

  @Column({ type: 'enum', enum: PengurusIntiRole, nullable: false })
  pi_role: PengurusIntiRole;

  @Column({
    type: 'enum',
    enum: GlobalAuthorityLevel,
    default: GlobalAuthorityLevel.CONTEXT_ADMIN, // Because a user that isnt logged in is outside of OKK context (like a god)
  })
  global_authority: GlobalAuthorityLevel = GlobalAuthorityLevel.CONTEXT_ADMIN;

  //   constructor() {
  //     super();

  //     if (adminTypes.includes(this.pi_role)) {
  //       this.pi_authority_level = AuthorityLevelPI.ADMIN;
  //     } else {
  //       this.pi_authority_level = AuthorityLevelPI.NORMAL;
  //     }
  //   }
}
