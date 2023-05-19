import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Office } from './office.entity';
import { Room } from './room.entity';

@Entity('City')
export class City {
  @ApiProperty({ description: 'City identifier', nullable: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'City name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'City full address', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  fullAddress: string;

  @OneToMany(() => Room, (room) => room.city)
  rooms: Room[];

  @OneToMany(() => Office, (office) => office.city)
  offices: Office[];
}
