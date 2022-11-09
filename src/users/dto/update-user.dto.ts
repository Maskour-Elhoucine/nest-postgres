import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../files/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../status/entities/status.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test@nestjs.com', description: 'User email' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'User with this email already exists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty({ description: 'User password' })
  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/, {
    message: 'Password is too weak',
  })
  password?: string | null;

  provider?: string;
  socialId?: string | null;

  @ApiProperty({ example: 'Test', description: 'User first name' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Nest', description: 'User last name' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image with this id does not exist',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'Role not exists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status | null;

  hash?: string | null;
}
