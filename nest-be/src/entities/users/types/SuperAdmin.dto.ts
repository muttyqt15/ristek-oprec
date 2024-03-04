import { BaseUserDto } from 'src/modules/types/BaseUser.dto';
import { MainRole } from './entity.types';

export class CreateSuperAdminDto extends BaseUserDto {
  role: MainRole.SUPER_ADMIN;
}
