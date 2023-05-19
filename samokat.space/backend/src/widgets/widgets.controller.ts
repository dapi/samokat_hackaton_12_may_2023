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
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Widget } from './entities/widget.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('widgets')
@ApiTags('Widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Adds a new widget to the list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Widget })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createWidgetDto: CreateWidgetDto) {
    return this.widgetsService.create(createWidgetDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns all widgets' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Widget,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.widgetsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns a widget with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Widget identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Widget })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.widgetsService.findOne(id);
  }

  @Post('/linkWithUser/:widgetId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Links a widget with user' })
  @ApiQuery({
    name: 'widgetId',
    required: true,
    description: 'Widget identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  linkWithUser(
    @Req() req: any,
    @Param('widgetId', new ParseIntPipe()) widgetId: number,
  ) {
    return this.widgetsService.linkWithUser(req?.user?.id, widgetId);
  }

  @Post('/unlinkFromUser/:widgetId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Deletes a widget from user list' })
  @ApiQuery({
    name: 'widgetId',
    required: true,
    description: 'Widget identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  unlinkFromUser(
    @Req() req: any,
    @Param('widgetId', new ParseIntPipe()) widgetId: number,
  ) {
    return this.widgetsService.unlinkFromUser(req?.user?.id, widgetId);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateWidgetDto: UpdateWidgetDto) {
    return this.widgetsService.update(+id, updateWidgetDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Deletes a widget with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Widget identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.widgetsService.remove(id);
  }
}
