import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkspaceBookingDto {
  @ApiProperty({ description: 'Room identifier', nullable: false })
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({ description: 'Booking name', nullable: false })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Booking description', nullable: false })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Start datetime', nullable: false })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End datetime', nullable: false })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Booking state', nullable: false })
  @IsNotEmpty()
  state: string;
}
