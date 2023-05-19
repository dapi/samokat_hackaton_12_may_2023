import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity('Office')
export class Office {
  @ApiProperty({ description: 'Office identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Office name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'Office description', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  description: string;

  @ManyToOne(() => City, (city) => city.offices)
  city: City;
}
