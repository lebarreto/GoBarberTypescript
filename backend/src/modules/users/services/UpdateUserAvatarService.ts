import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import Users from '../infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(user_id);

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
    await userRepository.save(user);

    return user;
  }
}
