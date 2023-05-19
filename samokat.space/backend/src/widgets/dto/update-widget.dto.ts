import { PartialType } from '@nestjs/swagger';
import { CreateWidgetDto } from './create-widget.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateWidgetDto extends PartialType(CreateWidgetDto) {
  @ApiProperty({ description: 'Widget name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Widget description', nullable: true })
  description: string;
}
