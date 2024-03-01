import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../User';
import { MainRole } from '../types/entity.types';
import { BPH_ROLE, DivisiBPH } from '../types/bph.types';
import { Rapat } from 'src/entities/other/Rapat';

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
    enum: BPH_ROLE,
    default: BPH_ROLE.STAFF,
  })
  bph_role: BPH_ROLE;

  @ManyToMany(() => Rapat, (rapat) => rapat.list_hadir, { nullable: true })
  rapat_dihadiri?: Rapat[];
}
