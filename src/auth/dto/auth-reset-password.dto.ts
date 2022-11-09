import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class AuthResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/, {
    message:
      'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
