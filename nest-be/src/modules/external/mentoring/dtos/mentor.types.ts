import { MainRole } from 'src/entities/users/types/entity.types';
import { BaseUser } from 'src/modules/types/BaseUser.type';

export interface CreateMentorParams extends BaseUser {
  role: MainRole.MENTOR;
  interests?: string;
}
