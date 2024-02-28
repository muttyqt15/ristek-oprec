import { MainRole } from 'src/entities/users/types/entity.types';

export type BaseUser = {
  name: string;
  password: string;
  batch: number;
  role: MainRole;
  refreshToken?: string;
};
