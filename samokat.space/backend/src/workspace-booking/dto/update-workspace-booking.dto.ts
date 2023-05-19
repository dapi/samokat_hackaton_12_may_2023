import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkspaceBookingDto } from './create-workspace-booking.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateWorkspaceBookingDto extends PartialType(
  CreateWorkspaceBookingDto,
) {
  @ApiProperty({ description: 'Room identifier', nullable: false })
  @IsNotEmpty()
  roomId: number;

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
