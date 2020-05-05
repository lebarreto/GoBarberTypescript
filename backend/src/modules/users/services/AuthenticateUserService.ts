import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
