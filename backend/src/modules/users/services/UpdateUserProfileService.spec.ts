import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Letícia M Barreto',
      email: 'leticiambrt2@gmail.com',
    });

    expect(updatedUser.name).toBe('Letícia M Barreto');
    expect(updatedUser.email).toBe('leticiambrt2@gmail.com');
  });

  it('should not be able to update the email with another email already used', async () => {
    await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456789',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Teste5',
        email: 'leticiambrt@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Letícia M Barreto',
      email: 'leticiambrt2@gmail.com',
      old_password: '123456789',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without saying the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Letícia M Barreto',
        email: 'leticiambrt2@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Letícia Barreto',
      email: 'leticiambrt@gmail.com',
      password: '123456789',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Letícia M Barreto',
        email: 'leticiambrt2@gmail.com',
        old_password: '123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile with non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-user',
        name: 'Letícia M Barreto',
        email: 'leticiambrt2@gmail.com',
        old_password: '123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
