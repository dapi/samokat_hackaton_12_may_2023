import { ApiProperty } from '@nestjs/swagger';
import { Widget } from 'src/widgets/entities/widget.entity';
import { Room } from 'src/workspace-booking/entities/room.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @ApiProperty({ description: 'User identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'User name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'User email', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  email: string;

  @ApiProperty({ description: 'User job title', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  jobTitle: string;

  @ApiProperty({ description: 'User image url', nullable: true })
  @Column({ type: 'nvarchar', length: 350 })
  imgUrl: string;

  @ApiProperty({ description: 'User login', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  login: string;

  @ApiProperty({ description: 'User login', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  password: string; // TODO: not secure

  @ManyToMany(() => Widget, (widget) => widget.users)
  widgets: Widget[];

  @OneToMany(() => Room, (room) => room.user)
  rooms: Room[];
}
