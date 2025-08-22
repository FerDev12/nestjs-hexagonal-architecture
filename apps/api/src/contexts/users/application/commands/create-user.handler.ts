import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserFactory } from '../../domain/factories/user.factory';
import { UserRepository } from '../ports/user.repository';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
    const user = UserFactory.create(command.name, command.email);
    await this.userRepository.save(user);
    return { id: user.id };
  }
}
