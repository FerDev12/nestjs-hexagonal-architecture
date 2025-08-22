export type AggregateId = string;

export type CreateEntityProps<EntityProps> = EntityProps & {
  id?: AggregateId;
  createdAt?: Date;
  updatedAt?: Date | null;
};

export abstract class Entity<EntityProps> {
  private _id: AggregateId;
  private _createdAt: Date;
  private _updatedAt: Date | null;

  constructor(props: CreateEntityProps<EntityProps>) {
    const { id, createdAt, updatedAt, ...rest } = props;
    this._id = id ?? crypto.randomUUID();
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? null;
    this._props = rest as EntityProps;
    this.validate();
  }

  protected _props: EntityProps;

  get id(): AggregateId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  static isEntity<Props = unknown>(entity: unknown): entity is Entity<Props> {
    return entity instanceof Entity;
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (!Entity.isEntity(entity)) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    return this._id === entity.id;
  }

  protected abstract validate(): void;

  public toJSON(): Record<string, unknown> {
    const clonedProps = structuredClone(this._props);
    const json = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...clonedProps,
    };
    return Object.freeze(json);
  }
}
