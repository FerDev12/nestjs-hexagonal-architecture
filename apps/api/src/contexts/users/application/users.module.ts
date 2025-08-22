import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserFactory } from '../domain/factories/user.factory';
import { GetAllUsersQueryHandler } from './queries/get-all-users.handler';
import { GetUserByEmailQueryHandler } from './queries/get-user-by-email.handler';
import { CreateUserCommandHandler } from './commands/create-user.handler';

export interface UsersModuleOptions {
  infrastructure: Type | DynamicModule;
}

@Module({
  providers: [
    UserFactory,
    GetAllUsersQueryHandler,
    GetUserByEmailQueryHandler,
    CreateUserCommandHandler,
  ],
})
export class UsersModule {
  static forRoot(options: UsersModuleOptions): DynamicModule {
    return {
      module: UsersModule,
      imports: [options.infrastructure],
      exports: [options.infrastructure],
    };
  }
}
