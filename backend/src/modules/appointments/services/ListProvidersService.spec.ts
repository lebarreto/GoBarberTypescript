import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListAllProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Gabriel Barreto',
      email: 'gabriel@gmail.com',
      password: '123456789',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Michelle Barreto',
      email: 'michelle@gmail.com',
      password: '123456789',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
