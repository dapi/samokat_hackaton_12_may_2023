import { User } from 'src/users/entities/user.entity';
import { Widget } from 'src/widgets/entities/widget.entity';
import { City } from 'src/workspace-booking/entities/city.entity';
import { Office } from 'src/workspace-booking/entities/office.entity';
import { RoomBooking } from 'src/workspace-booking/entities/room-booking.entity';
import { Room } from 'src/workspace-booking/entities/room.entity';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'admin',
  password: 'TestPass2023',
  database: 'samokhod',
  synchronize: true,
  entities: [User, Widget, City, Room, Office, RoomBooking],
  extra: {
    trustServerCertificate: true,
  },
};

export default config;
