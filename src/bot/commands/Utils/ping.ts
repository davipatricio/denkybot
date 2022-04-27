import { Command, CommandRunOptions } from '../../../structures/Command';

export default class PingCommand extends Command {
  constructor() {
    super();
    this.rawName = 'PING';
    this.rawCategory = 'UTILS';
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
    return interaction.editReply(`${client.ws.ping}ms`);
  }
}
