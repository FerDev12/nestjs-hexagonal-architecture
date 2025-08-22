import { ExceptionCode } from './exception.codes';

interface SerializedException {
  message: string;
  code: ExceptionCode;
  cause?: string;
  stack?: string;
  name: string;
}

export abstract class Exception extends Error {
  abstract readonly code: ExceptionCode;
  public readonly cause?: string;

  constructor(readonly message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }

  public toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      cause: this.cause,
      stack: this.stack,
      name: this.name,
    };
  }
}
