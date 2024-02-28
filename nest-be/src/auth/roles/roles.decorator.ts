import { SetMetadata } from '@nestjs/common';
// Metadata for role guard
export const Roles = (...args: string[]) => SetMetadata('roles', args);
