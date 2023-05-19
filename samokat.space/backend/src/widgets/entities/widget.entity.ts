import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Widget')
export class Widget {
  @ApiProperty({ description: 'Widget identifier', nullable: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Widget name', nullable: false })
  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'Widget description', nullable: false })
  @Column({ type: 'nvarchar', length: 350 })
  description: string;

  @ManyToMany(() => User, (user) => user.widgets)
  @JoinTable()
  users: User[];
}
