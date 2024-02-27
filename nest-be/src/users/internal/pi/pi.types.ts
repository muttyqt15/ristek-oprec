import { MainRole } from 'src/entities/users/types/entity.types';
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';

export type CreatePIParams = {
  name: string;
  batch: number;
  password: string;
  role: MainRole;
  pi_role: PengurusIntiRole;
};
