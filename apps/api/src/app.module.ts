import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from './contexts/users/application/users.module';
import { UsersInfrastructureModule } from './contexts/users/infrastructure/users-infrastracture.module';

export interface CoreModuleOptions {
  driver: 'postgres' | 'in-memory';
}

@Module({
  imports: [CqrsModule.forRoot()],
})
export class AppModule {
  static register(options: CoreModuleOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        UsersModule.forRoot({
          infrastructure: UsersInfrastructureModule.forRoot({
            driver: options.driver,
          }),
        }),
      ],
    };
  }
}
