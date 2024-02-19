import { randomUUID } from 'crypto';

export type UserProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export class User {
  public readonly id: string;
  public props: Required<UserProps>;
  private constructor(props: UserProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
