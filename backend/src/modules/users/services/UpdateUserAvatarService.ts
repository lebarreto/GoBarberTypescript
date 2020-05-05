import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import Users from '../infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const avatarPath = path.join(uploadConfig.directory, user.avatar);
      const checkIfAvatarExists = await fs.promises.stat(avatarPath);

      // delete
      if (checkIfAvatarExists) {
        await fs.promises.unlink(avatarPath);
      }
    }

    user.avatar = avatarFilename;
    await this.userRepository.save(user);

    return user;
  }
}
