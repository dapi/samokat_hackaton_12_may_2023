import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { User } from 'src/users/entities/user.entity';
import { RoomBooking } from './room-booking.entity';

@Entity('Room')
export class Room {
  @ApiProperty({ description: 'Room identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Room name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ManyToOne(() => City, (city) => city.rooms)
  city: City;

  @ApiProperty({ description: 'Room availability flag', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  state: string;

  @ApiProperty({ description: 'Room is booked by', nullable: true })
  @ManyToOne(() => User, (user) => user.rooms)
  user: User;

  @OneToMany(() => RoomBooking, (booking) => booking.room)
  bookings: RoomBooking[];
}
