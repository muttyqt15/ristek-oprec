import { BaseUser } from 'src/modules/types/BaseUser.type';

export interface CreateMenteeParams extends BaseUser {
  jalur_masuk: string;
}
