import { Module, ValidationPipe } from '@nestjs/common';
import { UsersHttpController } from './controllers/users-http.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [UsersHttpController],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class UsersHttpPresenterModule {}
