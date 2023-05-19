import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WidgetsModule } from './widgets/widgets.module';

import ormConfig from './config/orm-configuration';
import appConfig from './config/app-configuration';
import { AuthModule } from './auth/auth.module';
import { WorkspaceBookingModule } from './workspace-booking/workspace-booking.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    AuthModule,
    UsersModule,
    WidgetsModule,
    WorkspaceBookingModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
