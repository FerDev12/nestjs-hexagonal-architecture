import { DynamicModule, Module } from '@nestjs/common';
import { UsersPersistenceModule } from './persistence/users-persistence.module';
import { UsersPresentersModule } from './presenters/users-presenters.module';

export interface UserInfrastructureModuleOptions {
  driver: 'postgres' | 'in-memory';
}

@Module({})
export class UsersInfrastructureModule {
  static forRoot(options: UserInfrastructureModuleOptions): DynamicModule {
    return {
      module: UsersInfrastructureModule,
      imports: [
        UsersPersistenceModule.forRoot(options.driver),
        UsersPresentersModule,
      ],
      exports: [UsersPersistenceModule.forRoot(options.driver)],
    };
  }
}
