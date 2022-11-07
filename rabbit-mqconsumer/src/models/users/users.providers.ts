import { DataSource } from 'typeorm';
import { UserBackup } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserBackup),
    inject: ['DATA_SOURCE'],
  },
];
