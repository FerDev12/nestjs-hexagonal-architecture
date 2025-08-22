import { Exception, ExceptionCodes } from 'src/lib/exceptions';

export class UserAlreadyExistsException extends Exception {
  static readonly message = 'User already exists';
  constructor(message = UserAlreadyExistsException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.CONFLICT;
}
