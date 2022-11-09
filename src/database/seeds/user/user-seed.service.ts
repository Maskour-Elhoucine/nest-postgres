import { Injectable } from '@nestjs/common';
import { RolesEnum } from '../../../roles/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from '../../../status/status.enum';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.userRepository.count({
      where: {
        role: {
          id: RolesEnum.admin,
        },
      },
    });

    if (countAdmin === 0) {
      await this.userRepository.save(
        this.userRepository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@aikyo.io',
          password: 'admin',
          role: {
            id: RolesEnum.admin,
            name: 'Admin',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countUser = await this.userRepository.count({
      where: {
        role: {
          id: RolesEnum.user,
        },
      },
    });

    if (countUser === 0) {
      await this.userRepository.save(
        this.userRepository.create({
          firstName: 'User',
          lastName: 'Test',
          email: 'user@aikyo.io',
          password: 'user',
          role: {
            id: RolesEnum.user,
            name: 'User',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
