import { User, UserProps } from './user';

describe('User Unit Test', () => {
  it('should create a user', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    const user = User.create(userProps);
    expect(user.props).toEqual({ ...userProps });
  });

  it('should be toJSON() method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };
    const user = User.create(userProps);
    user.toJSON();
    expect(user.toJSON()).toEqual({
      id: user.id,
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    });
  });
});
