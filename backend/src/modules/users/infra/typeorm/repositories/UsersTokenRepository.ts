import { getRepository, Repository } from 'typeorm';

import UserToken from '../entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

class UsersTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
