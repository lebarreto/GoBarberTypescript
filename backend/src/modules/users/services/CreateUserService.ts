import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const checkIfUserExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (checkIfUserExists) {
      throw new AppError('Email address is already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
