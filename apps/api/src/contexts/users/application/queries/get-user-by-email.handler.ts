import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserRepository } from '../ports/user.repository';
import { NotFoundException } from 'src/lib/exceptions';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery) {
    const user = await this.userRepository.findByEmail(query.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
