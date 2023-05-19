import { Module } from '@nestjs/common';
import { WorkspaceBookingService } from './workspace-booking.service';
import { WorkspaceBookingController } from './workspace-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Room } from './entities/room.entity';
import { RoomBooking } from './entities/room-booking.entity';
import { Office } from './entities/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Room, RoomBooking, Office])],
  controllers: [WorkspaceBookingController],
  providers: [WorkspaceBookingService],
  exports: [WorkspaceBookingService],
})
export class WorkspaceBookingModule {}
