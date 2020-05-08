import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;
  private mailProvider: IMailProvider;
  private userTokenRepository: IUserTokenRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('MailProvider')
    mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    userTokenRepository: IUserTokenRepository,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe.', 401);
    }

    await this.userTokenRepository.generateToken(user.id);

    await this.mailProvider.sendMail(email, 'Testando');
  }
}
