import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class Event {
  @ApiProperty({ description: 'Event identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Event title', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  title: string;

  @ApiProperty({ description: 'Event subtitle', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  subtitle: string;

  @ApiProperty({ description: 'Event subtitle', nullable: false })
  @Column({ type: 'nvarchar', length: 500 })
  description: string;

  @ApiProperty({ description: 'Event subtitle', nullable: false })
  @Column({ type: 'nvarchar', length: 500 })
  previewUrl: string;
}
