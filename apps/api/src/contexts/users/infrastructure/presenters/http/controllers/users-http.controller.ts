import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserCommand } from '../../../../application/commands/create-user.command';
import { GetUserByEmailQuery } from '../../../../application/queries/get-user-by-email.query';
import { UserHttpMapper } from '../mappers/users-http.mapper';
import { UserHttpResponse } from '../dtos/user-http-response.dto';
import { GetAllUsersQuery } from 'src/contexts/users/application/queries/get-all-users.query';

@Controller('users')
export class UsersHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createUserCommand = new CreateUserCommand(
      createUserDto.email,
      createUserDto.name,
    );
    return await this.commandBus.execute(createUserCommand);
  }

  @Get()
  async getAllUsers(): Promise<UserHttpResponse[]> {
    const users = await this.queryBus.execute(new GetAllUsersQuery());
    return users.map((user) => UserHttpMapper.toResponse(user));
  }

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<UserHttpResponse> {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
    return UserHttpMapper.toResponse(user);
  }
}
