export type PrimitiveValue = string | number | boolean;

export abstract class ValueObject<T> {
  constructor(protected readonly props: T) {
    this.validate();
  }

  protected abstract validate(): void;

  get value(): T {
    return this.props;
  }

  static isValueObject(vo: unknown): vo is ValueObject<unknown> {
    return vo instanceof ValueObject;
  }

  public equals(vo: ValueObject<unknown>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (!ValueObject.isValueObject(vo)) {
      return false;
    }

    if (this === vo) {
      return true;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  private checkIfEmpty(value: unknown): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }

    if (typeof value === 'number' && value === 0) {
      return true;
    }

    return false;
  }
}
