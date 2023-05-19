import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  password: string;
}
