import { User } from '../aggregates/user.aggregate';
import { Email } from '../value-objects/email.vo';

export class UserFactory {
  static create(name: string, email: string): User {
    const emailVO = new Email(email);
    return new User({ name, email: emailVO });
  }
}
