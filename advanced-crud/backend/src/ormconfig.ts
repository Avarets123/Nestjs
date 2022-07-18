import { ConnectionOptions } from 'typeorm';
import { GroupEntity } from '@app/group/entity/group.entity';
import { UserEntity } from '@app/user/entity/user.entity';

const port = +process.env.POSTGRES_PORT;
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const db = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;

const config: ConnectionOptions = {
  type: 'postgres',
  host: host ?? '172.19.0.2',
  port: port ?? 5432,
  username: user ?? 'osman',
  password: password ?? '123',
  database: 'first' ?? db,
  entities: [GroupEntity, UserEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
