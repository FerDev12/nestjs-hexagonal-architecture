import { Module } from '@nestjs/common';
import { UsersHttpPresenterModule } from './http/users-http-presenter.module';
import { UsersOrpcPresenterModule } from './orpc/users-orpc-presenter.module';

@Module({
  imports: [UsersHttpPresenterModule, UsersOrpcPresenterModule],
})
export class UsersPresentersModule {}
