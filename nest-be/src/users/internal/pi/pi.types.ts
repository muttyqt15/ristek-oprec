import { PengurusIntiRole } from 'src/entities/users/types/pi.types';
import { BaseUser } from 'src/users/types/BaseUser.type';

export interface CreatePIParams extends BaseUser {
  pi_role: PengurusIntiRole;
}
