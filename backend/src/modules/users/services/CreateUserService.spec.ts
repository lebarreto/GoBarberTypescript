import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('Create user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same e-mail', async () => {
    const userEmail = 'leticiambrt@gmail.com';

    await createUser.execute({
      name: 'Letícia Barreto',
      email: userEmail,
      password: '123456789',
    });

    //it must return an error
    expect(
      createUser.execute({
        name: 'Letícia Barreto',
        email: userEmail,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
