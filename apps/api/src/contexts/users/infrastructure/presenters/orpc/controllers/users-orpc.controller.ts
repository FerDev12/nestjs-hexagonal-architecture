import { Controller } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';
import { orpcContract } from '../../../../../../lib/orpc/contract';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from 'src/contexts/users/application/queries/get-all-users.query';
import { UsersOrpcMapper } from '../mappers/users-orpc.mapper';
import { CreateUserCommand } from 'src/contexts/users/application/commands/create-user.command';
import { GetUserByEmailQuery } from 'src/contexts/users/application/queries/get-user-by-email.query';

@Controller()
export class UsersOrpcController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Implement(orpcContract.users.list)
  list() {
    return implement(orpcContract.users.list).handler(async () => {
      const users = await this.queryBus.execute(new GetAllUsersQuery());
      return users.map((user) => UsersOrpcMapper.toResponse(user));
    });
  }

  @Implement(orpcContract.users.create)
  create() {
    return implement(orpcContract.users.create).handler(async ({ input }) => {
      const user = await this.commandBus.execute(
        new CreateUserCommand(input.email, input.name),
      );
      return { id: user.id };
    });
  }

  @Implement(orpcContract.users.getByEmail)
  getByEmail() {
    return implement(orpcContract.users.getByEmail).handler(
      async ({ input }) => {
        const user = await this.queryBus.execute(
          new GetUserByEmailQuery(input.email),
        );
        return UsersOrpcMapper.toResponse(user);
      },
    );
  }
}
