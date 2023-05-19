import { ApiProperty } from '@nestjs/swagger';

export class SuccessfullSignInDto {
  @ApiProperty({ description: 'User name', nullable: false })
  name: string;

  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @ApiProperty({ description: 'User job title', nullable: false })
  jobTitle: string;

  @ApiProperty({ description: 'User image url', nullable: true })
  imgUrl: string;

  @ApiProperty({ description: 'User access token', nullable: true })
  access_token: string;

  constructor(name: string, email: string, jobTitle: string, imgUrl: string) {
    this.name = name;
    this.email = email;
    this.jobTitle = jobTitle;
    this.imgUrl = imgUrl;
  }
}
