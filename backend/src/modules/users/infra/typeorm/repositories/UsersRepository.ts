import { getRepository, Repository } from 'typeorm';

import Users from '../entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
