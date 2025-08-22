import { Query } from '@nestjs/cqrs';
import { User } from '../../domain/aggregates/user.aggregate';

export class GetAllUsersQuery extends Query<User[]> {
  constructor() {
    super();
  }
}
