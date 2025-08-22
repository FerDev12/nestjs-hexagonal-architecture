import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryUserPersistenceModule } from './in-memory/in-memory-user-persistence.module';
import { PostgresUserPersistenceModule } from './postgres/postgres-user-persistence.module';

@Module({})
export class UsersPersistenceModule {
  static forRoot(driver: 'postgres' | 'in-memory'): DynamicModule {
    const persistenceModule =
      driver === 'postgres'
        ? PostgresUserPersistenceModule
        : InMemoryUserPersistenceModule;

    return {
      module: UsersPersistenceModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
