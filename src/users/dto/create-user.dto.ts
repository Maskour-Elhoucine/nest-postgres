import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../files/file.entity';
import { Role } from '../../roles/entities/role.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Status } from '../../status/entities/status.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'e.maskour@icloud.com', description: 'User email' })
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'User with this email already exists',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty({ description: 'User first name' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsNotEmpty()
  lastName: string;

  provider?: string;
  socialId?: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image with this id does not exist',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'Role not exists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status;

  hash?: string | null;
}
