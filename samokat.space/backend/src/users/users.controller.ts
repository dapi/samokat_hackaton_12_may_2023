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
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Creates a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns currently authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getCurrentUserInfo(@Req() req: any) {
    return this.usersService.findById(req?.user?.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns a user with specified id' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('userId', new ParseIntPipe()) id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Deletes a user with specified id' })
  @ApiParam({ name: 'userId', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('userId', new ParseIntPipe()) id: number) {
    return this.usersService.remove(id);
  }
}
