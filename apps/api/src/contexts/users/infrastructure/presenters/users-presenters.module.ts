import { Module } from '@nestjs/common';
import { UsersHttpPresenterModule } from './http/users-http-presenter.module';

@Module({
  imports: [UsersHttpPresenterModule],
})
export class UsersPresentersModule {}
