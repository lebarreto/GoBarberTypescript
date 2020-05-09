import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate(): Promise<string> {
    return 'mail content';
  }
}
