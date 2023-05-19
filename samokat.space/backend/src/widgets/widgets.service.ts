import { Injectable } from '@nestjs/common';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Widget } from './entities/widget.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(Widget)
    private readonly widgetsRepository: Repository<Widget>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createWidgetDto: CreateWidgetDto) {
    const entity = this.widgetsRepository.create({ ...createWidgetDto });
    return this.widgetsRepository.save(entity);
  }

  findAll() {
    return this.widgetsRepository.find();
  }

  findOne(id: number) {
    return this.widgetsRepository.findOne({ where: { id } });
  }

  update(id: number, updateWidgetDto: UpdateWidgetDto) {
    return `This action updates a #${id} widget`;
  }

  async remove(id: number) {
    const widget = await this.widgetsRepository.find({ where: { id } });
    return this.widgetsRepository.remove(widget);
  }

  async linkWithUser(userId: number, id: number) {
    const widget = await this.findOne(id);

    if (widget) {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.widgets', 'widgets')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user.widgets) {
        user.widgets = [];
      }
      user.widgets = [...user.widgets, widget];

      return this.usersRepository.save(user);
    }

    return Promise.reject();
  }

  async unlinkFromUser(userId: number, id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.widgets', 'widgets')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user.widgets) {
      return Promise.resolve(user);
    }

    user.widgets = [...user.widgets.filter((w) => w.id !== id)];

    return this.usersRepository.save(user);
  }
}
