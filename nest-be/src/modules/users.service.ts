import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAdmin } from 'src/entities/users/superAdmin';
import { Repository } from 'typeorm';
import { BaseUser } from './types/BaseUser.type';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(SuperAdmin)
    private readonly superAdminService: Repository<SuperAdmin>,
  ) {}

  async createSuperAdmin(createSuperAdmin: BaseUser) {
    const { password } = createSuperAdmin;
    const hashedPassword = await hashPassword(password);
    const admin = await this.superAdminService.create({
      ...createSuperAdmin,
      password: hashedPassword,
    });
    return await this.superAdminService.save(admin);
  }

  async updateSuperadmin(adminId: number, updateDetails: Partial<BaseUser>) {
    return await this.superAdminService.update(
      { id: adminId },
      { ...updateDetails },
    );
  }

  async findAdminByName(name: string) {
    const admin = await this.superAdminService.findOne({
      where: { name: name },
    });
    return admin;
  }
}
