import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../../status/entities/status.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from '../../../status/status.enum';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async run() {
    const count = await this.statusRepository.count();

    if (count === 0) {
      await this.statusRepository.save([
        this.statusRepository.create({
          id: StatusEnum.active,
          name: 'Active',
        }),
        this.statusRepository.create({
          id: StatusEnum.inactive,
          name: 'Inactive',
        }),
      ]);
    }
  }
}
