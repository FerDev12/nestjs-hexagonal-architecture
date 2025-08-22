import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from './contexts/users/application/users.module';
import { UsersInfrastructureModule } from './contexts/users/infrastructure/users-infrastracture.module';
import { onError, ORPCModule } from '@orpc/nest';
import { REQUEST } from '@nestjs/core';

export interface CoreModuleOptions {
  driver: 'postgres' | 'in-memory';
}

@Module({
  imports: [
    CqrsModule.forRoot(),
    ORPCModule.forRootAsync({
      useFactory: (request: Request) => ({
        interceptors: [
          onError((error) => {
            console.error(error);
          }),
        ],
        context: { request },
        eventIteratorKeepAliveInterval: 5000,
      }),
      inject: [REQUEST],
    }),
  ],
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
