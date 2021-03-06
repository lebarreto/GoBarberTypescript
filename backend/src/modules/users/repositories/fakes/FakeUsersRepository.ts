import { uuid } from 'uuidv4';

import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findById(id: string): Promise<Users | undefined> {
    const user = this.users.find((users) => users.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = this.users.find((users) => users.email === email);

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<Users[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter((user) => user.id !== except_user_id);
    }

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const user = new Users();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex((users) => users.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
