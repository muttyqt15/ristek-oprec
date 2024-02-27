import { Column, Entity } from 'typeorm';
import { User } from '../User';
import { MainRole } from '../types/entity.types';
import { AuthorityLevelBPH, DivisiBPH } from '../types/bph.types';

@Entity({ name: 'anggota_bph' })
export class AnggotaBPH extends User {
  @Column({
    type: 'enum',
    enum: MainRole,
    default: MainRole.BPH,
  })
  role: MainRole = MainRole.BPH;

  @Column({
    type: 'enum',
    enum: DivisiBPH,
    default: DivisiBPH.KEAMANAN,
  })
  divisi: DivisiBPH;

  @Column({
    type: 'enum',
    enum: AuthorityLevelBPH,
    default: AuthorityLevelBPH.STAFF,
  })
  authority_level: AuthorityLevelBPH;
}
