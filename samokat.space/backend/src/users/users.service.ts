import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const entity = this.usersRepository.create({ ...createUserDto });
    return this.usersRepository.save(entity);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.widgets', 'widgets')
      .where('user.id = :id', { id })
      .getOne();
  }

  findByLogin(login: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.usersRepository.find({ where: { id } });
    return this.usersRepository.remove(user);
  }
}
