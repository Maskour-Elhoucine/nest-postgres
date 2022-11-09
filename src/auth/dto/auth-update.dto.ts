import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { FileEntity } from '../../files/file.entity';

export class AuthUpdateDto {
  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'File does not exist',
  })
  photo?: FileEntity;

  @ApiProperty({ example: 'Elhoucine' })
  @IsOptional()
  @IsNotEmpty({ message: 'First name is required' })
  firstName?: string;

  @ApiProperty({ example: 'Maskour' })
  @IsOptional()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/, {
    message: 'Password is too weak',
  })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'Ancien password is required' })
  oldPassword: string;
}
