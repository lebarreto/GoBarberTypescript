import { inject, injectable } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Users[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    return user;
  }
}
