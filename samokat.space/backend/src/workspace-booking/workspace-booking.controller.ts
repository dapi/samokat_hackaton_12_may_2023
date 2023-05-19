import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { WorkspaceBookingService } from './workspace-booking.service';
import { CreateWorkspaceBookingDto } from './dto/create-workspace-booking.dto';
import { UpdateWorkspaceBookingDto } from './dto/update-workspace-booking.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoomBooking } from './entities/room-booking.entity';
import { City } from './entities/city.entity';
import { Office } from './entities/office.entity';

@Controller('room-booking')
@ApiTags('RoomBooking')
export class WorkspaceBookingController {
  constructor(
    private readonly workspaceBookingService: WorkspaceBookingService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Creates a booking' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: RoomBooking,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createWorkspaceBookingDto: CreateWorkspaceBookingDto) {
    return this.workspaceBookingService.create(createWorkspaceBookingDto);
  }

  @Get('/cities')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Returns list of cities where an office is available',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: City,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getListOfCities() {
    return this.workspaceBookingService.getListOfCities();
  }

  @Get('/offices')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Returns list of offices available in a city',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Office,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getListOfOffices(@Query('cityId', new ParseIntPipe()) cityId: number) {
    return this.workspaceBookingService.getListOfOffices(cityId);
  }

  @Get('/rooms')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Returns list of available rooms in an office in a city',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    // type: Room,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getListOfRooms(@Query('officeId', new ParseIntPipe()) officeId: number) {
    return this.workspaceBookingService.getListOfRooms(officeId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns all bookings' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: RoomBooking,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.workspaceBookingService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.workspaceBookingService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceBookingDto: UpdateWorkspaceBookingDto,
  ) {
    return this.workspaceBookingService.update(+id, updateWorkspaceBookingDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.workspaceBookingService.remove(+id);
  }
}
