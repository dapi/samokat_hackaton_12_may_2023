import { Injectable } from '@nestjs/common';
import { CreateWorkspaceBookingDto } from './dto/create-workspace-booking.dto';
import { UpdateWorkspaceBookingDto } from './dto/update-workspace-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { Office } from './entities/office.entity';
import { Room } from './entities/room.entity';
import { RoomBooking } from './entities/room-booking.entity';

@Injectable()
export class WorkspaceBookingService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
    @InjectRepository(Office)
    private readonly officesRepository: Repository<Office>,
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    @InjectRepository(RoomBooking)
    private readonly bookingsRepository: Repository<RoomBooking>,
  ) {}

  async create(createWorkspaceBookingDto: CreateWorkspaceBookingDto) {
    const room = await this.roomsRepository.findOne({
      where: { id: createWorkspaceBookingDto.roomId },
    });

    if (room) {
      const entity = this.bookingsRepository.create({
        ...createWorkspaceBookingDto,
      });

      entity.room = room;

      return this.bookingsRepository.save(entity);
    }
  }

  findAll() {
    return this.bookingsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceBooking`;
  }

  update(id: number, updateWorkspaceBookingDto: UpdateWorkspaceBookingDto) {
    return `This action updates a #${id} workspaceBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceBooking`;
  }

  getListOfCities() {
    return this.citiesRepository.find();
  }

  getListOfOffices(cityId: number) {
    return this.officesRepository
      .createQueryBuilder('office')
      .leftJoinAndSelect('office.city', 'city')
      .where('city.id = :cityId', { cityId })
      .getMany();
  }

  async getListOfRooms(officeId: number) {
    return this.roomsRepository.find(); // TODO: filter by officeId
  }
}
