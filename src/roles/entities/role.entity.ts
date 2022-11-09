import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '../../helpers/entity.helper';

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: '1', description: 'Role unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'admin', description: 'Role name' })
  name: string;
}
