import { Command, CommandRunOptions } from '../../../structures/Command';

export default class TestCommand extends Command {
  constructor() {
    super();
    this.rawName = 'TEST';
    this.rawCategory = 'Test';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = {
      bot: [],
      user: [],
    };
  }

  override run({ client, interaction }: CommandRunOptions) {
    return { client, interaction };
  }
}
