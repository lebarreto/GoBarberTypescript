import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const checkIfUserExists = await this.userRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError('Email address is already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
