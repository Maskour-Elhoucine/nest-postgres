import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../roles/entities/role.entity';
import { Repository } from 'typeorm';
import { RolesEnum } from '../../../roles/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async run() {
    const countUsers = await this.roleRepository.count({
      where: {
        id: RolesEnum.user,
      },
    });

    if (countUsers === 0) {
      await this.roleRepository.save(
        this.roleRepository.create({
          id: RolesEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmins = await this.roleRepository.count({
      where: {
        id: RolesEnum.admin,
      },
    });

    if (countAdmins === 0) {
      await this.roleRepository.save(
        this.roleRepository.create({
          id: RolesEnum.admin,
          name: 'Admin',
        }),
      );
    }
  }
}
