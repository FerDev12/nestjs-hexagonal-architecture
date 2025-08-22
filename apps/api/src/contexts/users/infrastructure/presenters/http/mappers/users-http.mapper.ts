import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';
import { UserHttpResponse } from '../dtos/user-http-response.dto';

export class UserHttpMapper {
  static toResponse(user: User): UserHttpResponse {
    return new UserHttpResponse(
      user.id,
      user.name,
      user.email.value,
      user.createdAt,
      user.updatedAt,
    );
  }
}
