import { Exception } from './exceptions.base';
import { ExceptionCodes } from './exception.codes';

export class InvalidArgumentException extends Exception {
  static readonly message = 'Invalid argument';
  constructor(message = InvalidArgumentException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.INVALID_ARGUMENT;
}

export class NotFoundException extends Exception {
  static readonly message = 'Not found';
  constructor(message = NotFoundException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.NOT_FOUND;
}

export class ConflictException extends Exception {
  static readonly message = 'Conflict';
  constructor(message = ConflictException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.CONFLICT;
}

export class InternalServerErrorException extends Exception {
  static readonly message = 'Internal server error';
  constructor(message = InternalServerErrorException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.INTERNAL_SERVER_ERROR;
}

export class ArgumentNotProvidedException extends Exception {
  static readonly message = 'Argument not provided';
  constructor(message = ArgumentNotProvidedException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.ARGUMENT_NOT_PROVIDED;
}

export class ArgumentOutOfRangeException extends Exception {
  static readonly message = 'Argument out of range';
  constructor(message = ArgumentOutOfRangeException.message) {
    super(message);
  }
  readonly code = ExceptionCodes.OUT_OF_RANGE;
}
