import { User, UserProps } from './user';

describe('User Unit Test', () => {
  it('should construtor()', () => {
    let userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    let user = User.create(userProps);

    userProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    expect(user.id).toBeDefined();
    user = User.create(userProps);

    expect(user.props).toEqual({
      ...userProps,
    });
  });

  it('should be updateName method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    const user = User.create(userProps);
    user.updateName('Johnson');
    expect(user.name).toBe('Johnson');
  });

  it('should be updateSurname method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };
    const user = User.create(userProps);
    user.updateSurname('Doe Johnson');
    expect(user.surname).toBe('Doe Johnson');
  });

  it('should be updateEmail method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    const user = User.create(userProps);
    user.updateEmail('johndue@teste.com');
    expect(user.email).toBe('johndue@teste.com');
  });

  it('should be updatePassword method', () => {
    const userProps: UserProps = {
      name: 'John',
      surname: 'Doe',
      email: 'teste@teste.com',
      password: '123',
    };

    const user = User.create(userProps);
    user.updatePassword('1234');
    expect(user.password).toBe('1234');
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
