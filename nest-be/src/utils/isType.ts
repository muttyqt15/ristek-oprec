import { AuthDto } from 'src/auth/auth.dto';
import { CreateBPHParams } from 'src/modules/internal/bph/bph.types';
import { CreatePIParams } from 'src/modules/internal/pi/types';

export function isCreateBPHParams(dto: AuthDto): dto is CreateBPHParams {
  return (dto as CreateBPHParams).divisi !== undefined;
}

export function isCreatePIParams(dto: AuthDto): dto is CreatePIParams {
  return (dto as CreatePIParams).pi_role !== undefined;
}
