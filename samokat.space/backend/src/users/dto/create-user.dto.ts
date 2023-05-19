import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User job title', nullable: false })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ description: 'User image url', nullable: true })
  @IsUrl()
  imgUrl: string;
}
