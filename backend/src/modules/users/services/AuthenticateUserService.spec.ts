import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('Authenticate user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await createUser.execute({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    const response = await authenticateUser.execute({
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate user non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'leticiambrt@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const userPassword = '123456789';

    await createUser.execute({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: userPassword,
    });

    expect(
      authenticateUser.execute({
        email: 'leticiambrt@gmail.com',
        password: '11111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
