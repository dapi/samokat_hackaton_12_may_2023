import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWidgetDto {
  @ApiProperty({ description: 'Widget name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Widget description', nullable: true })
  description: string;
}
