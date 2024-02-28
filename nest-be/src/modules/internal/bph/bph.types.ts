import { BPH_ROLE, DivisiBPH } from 'src/entities/users/types/bph.types';
import { BaseUser } from 'src/modules/types/BaseUser.type';

export interface CreateBPHParams extends BaseUser {
  divisi: DivisiBPH;
  bph_role: BPH_ROLE;
}
