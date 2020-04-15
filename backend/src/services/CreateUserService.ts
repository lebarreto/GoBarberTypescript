import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';

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
      throw new Error('Email address is already used.');
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
