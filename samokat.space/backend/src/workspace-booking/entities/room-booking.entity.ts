import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity('RoomBooking')
export class RoomBooking {
  @ApiProperty({ description: 'Booking identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Office name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'Office description', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  description: string;

  @ApiProperty({ description: 'Start datetime', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  startDate: string;

  @ApiProperty({ description: 'End datetime', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  endDate: string;

  @ApiProperty({ description: 'Booking state', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  state: string;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;
}
